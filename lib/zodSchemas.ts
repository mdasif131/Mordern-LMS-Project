import z from "zod"

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const
export const courseStatus = ["Draft", "Published", "Archie"] as const
export const coursesCategories = [
  "Development",
  "IT & Software",
  "Business",
  "Finance",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const
export const coursesSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  fileKey: z.string().min(1, "File is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  duration: z.coerce.number().min(0, "Duration must be positive"),
  level: z.enum(courseLevels, { message: "Level is required" }),
  stripePriceId: z.string().optional(),
  category: z.enum(coursesCategories, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small Description must be at least 3 characters long" })
    .max(200, {
      message: "Small Description must be at least 200 characters long",
    }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
  status: z.enum(courseStatus, { message: "Status is required" }),
})

export const chapterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 character long"),
  courseId: z.string().min(1, "Invalid course Id"),
})
export const lessonSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 character long"),
  courseId: z.string().min(1, "Invalid course Id"),
  chapterId: z.string().min(1, "Invalid chapter Id"),
  description: z
    .string()
    .min(3, "Description must be at least 3 character long")
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
})
export type CoursesSchemaType = z.infer<typeof coursesSchema>
export type ChapterSchemaType = z.infer<typeof chapterSchema>
export type LessonSchemaType = z.infer<typeof lessonSchema>
