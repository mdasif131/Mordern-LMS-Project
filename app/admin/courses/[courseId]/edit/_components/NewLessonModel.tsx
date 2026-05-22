import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { tryCatch } from "@/hooks/try-catch"
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, PlusIcon } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { createLesson } from "../action"

const NewLessonModel = ({
  courseId,
  chapterId,
}: {
  courseId: string
  chapterId
: string}) => {
  const [ispending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
      chapterId: chapterId,
    },
  })
  
  async function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(values))

      if (error) {
        toast.error("An unexpected error occurred. Please try again.")
        return
      }

      if (result.status === "success") {
        toast.success(result.message)
        form.reset()
        setIsOpen(false)
      } else {
        toast.error(result.message)
      }
    })
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setIsOpen(open)
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="gap-2 w-full">
          <Plus className="size-4" /> New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogTitle>Create new lesson</DialogTitle>
        <DialogDescription>
          What would you like to name your lesson?
        </DialogDescription>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 py-4.5"
                      placeholder="chapter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={ispending}>
                {ispending ? (
                  <>
                    Creating... <Loader className="ml-1 animate-spin" />
                  </>
                ) : (
                  <>
                    Create Lesson <PlusIcon size={16} />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewLessonModel
