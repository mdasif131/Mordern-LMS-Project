"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { tryCatch } from "@/hooks/try-catch"
import Link from "next/link"
import { useTransition } from "react"
import { toast } from "sonner"
import { deleteCourse } from "./actions"
import { useParams, useRouter } from "next/navigation"
import { Loader, Trash2 } from "lucide-react"
import { useConfetti } from "@/hooks/use-confetti"

const DeleteCourse = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter();
  const {fireWorksConfeeti} = useConfetti();
  const { courseId } = useParams<{ courseId: string }>()
    function onSubmit() {
      startTransition(async () => {
        const { data: result, error } = await tryCatch(deleteCourse(courseId))
        if (error) {
          toast.error("An unexpected error occurred. Please try again.")
          return
        }
        if (result.status === "success") {
          toast.success(result.message)
          fireWorksConfeeti();
          router.push("/admin/courses")
        } else if (result.status === "error") {
          toast.error(result.message)
        }
      })
    }
  
  return (
    <div className="max-w-xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>This action could not be undo.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link href={"/admin/courses"} className={buttonVariants({variant:"outline"})}>
            Cancel</Link>
          <Button variant={'destructive'} onClick={onSubmit} disabled={isPending}>
            {isPending ? (<><Loader className="size-4 animate-spin" /> Deleting...</>) : (<><Trash2 className="size-4"/> Delete</>)}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default DeleteCourse