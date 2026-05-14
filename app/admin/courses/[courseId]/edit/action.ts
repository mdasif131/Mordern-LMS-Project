"use server"
import { requireAdmin } from "@/app/data/admin/require-admin"
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet"
import { prisma } from "@/lib/db"
import { ApiResponse } from "@/lib/types"
import { coursesSchema, CoursesSchemaType } from "@/lib/zodSchemas"
import { request } from "@arcjet/next"
import { revalidatePath } from "next/cache"

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  )
export async function editCourse(
  data: CoursesSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin()
  try {
    const req = await request()
    const decision = await aj.protect(req, { fingerprint: user.user.id })
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to rate limiting",
        }
      } else {
        return {
          status: "error",
          message: "You are a bot! if this is a mistake contact our support",
        }
      }
    }
    const result = coursesSchema.safeParse(data)
    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      }
    }
    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    })
    return {
      status: "success",
      message: "Course updated successfully",
    }
  } catch {
    return {
      status: "error",
      message: "Failed to update course",
    }
  }
}

export async function reorderLessons(
  chapterId: string,
  lesson: { id: string; position: number }[],
  courseId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    if (!lesson || lesson.length === 0) {
      return {
        status: "error",
        message: "No lessons provided for reordering.",
      }
    }
    const updates = lesson.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId: chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    )
    await prisma.$transaction(updates)
    revalidatePath(`/admin/courses/${courseId}/edit`)
    return {
      status: "success",
      message: "Lessons reordered successfully",
    }
  } catch {
    return {
      status: "error",
      message: "Failed to reorder lessons",
    }
  }
}

export async function reorderChapter(
  courseId: string,
  chapter: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    if (!chapter || chapter.length === 0) {
      return {
        status: "error",
        message: "No Chapter provided for reorderig",
      }
    }
    const updates = chapter.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    )
    await prisma.$transaction(updates)
    revalidatePath(`/admin/courses/${courseId}/edit`)
    return {
      status: "success",
      message: "Chapter reordered successfully"
    }
  } catch {
    return {
      status: "error",
      message: "Failed to reorder chapter",
    }
  }
}
