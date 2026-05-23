"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  courseLevels,
  coursesCategories,
  coursesSchema,
  CoursesSchemaType,
  courseStatus,
} from "@/lib/zodSchemas"
import { ArrowLeft, Loader, PlusIcon, SparkleIcon } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import slugify from "slugify"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import RichTextEditor from "@/components/rich-text-editor/Editor"
import Uploader from "@/components/file-uploader/Uploader"
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { CreateCourses } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti"
const CoursesCreationPage = () => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const {triggerConfetti,fireWorksConfeeti} = useConfetti();
  const form = useForm({
    resolver: zodResolver(coursesSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      category: "Development",
      status: "Draft",
      slug: "",
      smallDescription: "",
    },
  })
  function onSubmit(values: CoursesSchemaType) {
    startTransition(async () => { 
      const { data:result, error } = await tryCatch(CreateCourses(values))
      if (error) { 
        toast.error("An unexpected error occurred. Please try again.")
        return;
      }
      if (result.status === 'success') {
        toast.success(result.message)
        triggerConfetti();
        fireWorksConfeeti();
        form.reset();
        router.push("/admin/courses")
      } else if (result.status === 'error') { 
        toast.error(result.message)
      }
    })
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href={"/admin/courses"}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1 py-4.5"
                        placeholder="title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end gap-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1 py-4.5"
                          placeholder="slug"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="w-fit"
                  onClick={() => {
                    const tilteValue = form.getValues("title")
                    const slug = slugify(tilteValue)
                    form.setValue("slug", slug, { shouldValidate: true })
                  }}
                >
                  Generate Slug <SparkleIcon className="ml-1" size={16} />
                </Button>
              </div>
              <FormField
                control={form.control}
                name="smallDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Small Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="mt-1"
                        placeholder="Short description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fileKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Uploader onChange={field.onChange} value={field.value || ""} fileTypeAccepted="image" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="mt-1 py-4.5">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {coursesCategories.map((category, index) => (
                            <SelectItem
                              key={`${category}-${index}`}
                              value={category}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="mt-1 py-4.5">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseLevels.map((level, index) => (
                            <SelectItem key={`${level}-${index}`} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="mt-1 py-4.5"
                          placeholder="duration in hours"
                          {...field}
                          value={field.value as number}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pirce ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="mt-1 py-4.5"
                          placeholder="thumbnail url"
                          {...field}
                          value={field.value as number}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-1 py-4.5">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseStatus.map((status, index) => (
                          <SelectItem key={`${status}-${index}`} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={pending} size={"lg"}>
                {pending ? (
                  <>
                    Createing... <Loader className="animate-spin ml-1" />
                  </>
                ) : (
                  <>
                    Create Course <PlusIcon size={16} />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default CoursesCreationPage
