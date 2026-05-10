"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { coursesSchema, CoursesSchemaType } from "@/lib/zodSchemas";
import { headers } from "next/headers";

export const CreateCourses = async (data:CoursesSchemaType):Promise<ApiResponse> => { 
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const validation = coursesSchema.safeParse(data);
    if (!validation.success) { 
      return {
        status: "error",
        message:"Invalid Form Data"
      }
    }
    await prisma.course.create({
      data: {
        ...validation.data,
        smallDescription: validation.data.smallDescription,
        description: validation.data.description,
        userId:session?.user.id as string,
      },
    })
    return {
      status: "success",
      message: "Course create successfully"
    }
  } catch (err) { 
    console.log(err)
    return {
      status: 'error',
      message: "Failed to create"
    }
  }
}