import "server-only" 
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
export const adminGetCourse = async (id:string) => {
  await requireAdmin() 

  const data = await prisma.course.findUnique({
    where: {
      id:id,
    },
    select: {
      id: true,
      title: true,
      slug:true,
      smallDescription: true,
      description: true,
      fileKey: true,
      price: true,
      category: true,
      level: true,
      duration: true,
      status: true
    }
  })
  if (!data) { 
    return notFound();
  }
  return data;
}
export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourse>>