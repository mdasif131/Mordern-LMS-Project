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
import { chapterSchema, ChapterSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, PlusIcon } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { createChapter } from "../action"
import { toast } from "sonner"

const NewChapterModal = ({ courseId }: { courseId: string }) => {
  const [ispending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<ChapterSchemaType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
    },
  })

  async function onSubmit(values: ChapterSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createChapter(values))

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
      form.reset()
    }
    setIsOpen(open)
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="gap-2">
          <Plus className="size-4" /> New Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogTitle>Create new chapter</DialogTitle>
        <DialogDescription>
          What would you like to name your chapter?
        </DialogDescription>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Name</FormLabel>
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
                    Create Chapter <PlusIcon size={16} />
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

export default NewChapterModal
