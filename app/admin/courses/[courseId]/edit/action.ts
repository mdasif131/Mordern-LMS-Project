"use server"
import { requireAdmin } from "@/app/data/admin/require-admin"
import { prisma } from "@/lib/db"
import { ApiResponse } from "@/lib/types"
import { coursesSchema, CoursesSchemaType } from "@/lib/zodSchemas"

export async function editCourse(
  data: CoursesSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin()
  try {
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
