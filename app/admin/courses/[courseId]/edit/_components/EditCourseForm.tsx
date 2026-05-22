"use client"
import Uploader from "@/components/file-uploader/Uploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tryCatch } from "@/hooks/try-catch";
import { courseLevels, coursesCategories, coursesSchema, CoursesSchemaType, courseStatus } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PlusIcon, SparkleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {  useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { editCourse } from "../action";
import { AdminCourseType } from "@/app/data/admin/admin-get-course";
interface iAppProps{
  data: AdminCourseType
}
const EditCourseForm = ({ data }:iAppProps) => {
    const [pending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm({
      resolver: zodResolver(coursesSchema),
      defaultValues: {
        title: data.title,
        description: data.description,
        fileKey: data.fileKey,
        price: data.price,
        duration: data.duration,
        level: data.level,
        category: data.category as CoursesSchemaType['category'],
        status: data.status ,
        slug: data.slug ,
        smallDescription: data.smallDescription,
      },
    })
    function onSubmit(values: CoursesSchemaType) {
         startTransition(async () => { 
            const { data:result, error } = await tryCatch(editCourse(values, data.id))
            if (error) { 
              toast.error("An unexpected error occurred. Please try again.")
              return;
            }
            if (result.status === 'success') {
              toast.success(result.message)
              form.reset();
              router.push("/admin/courses")
            } else if (result.status === 'error') { 
              toast.error(result.message)
            }
          })
        }
    
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="mt-1 py-4.5" placeholder="title" {...field} />
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
                <Uploader fileTypeAccepted="image" onChange={field.onChange} value={field.value} />
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
                      <SelectItem key={`${category}-${index}`} value={category}>
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              Updating... <Loader className="ml-1 animate-spin" />
            </>
          ) : (
            <>
              Update Course <PlusIcon size={16} />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default EditCourseForm