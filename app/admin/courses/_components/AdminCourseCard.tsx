import { AdminCoursesType } from "@/app/data/admin/admin-get-courses"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useConstructUrl } from "@/hooks/use-construct-url"
import {
  ArrowRight,
  Delete,
  Eye,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface iAppProps {
  data: AdminCoursesType
}
const AdminCourseCard = ({ data }: iAppProps) => {
  const thumbnailUrl = useConstructUrl(data.fileKey)
  return (
    <Card className="group relative gap-0 py-0">
      {/* absolute dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"secondary"}
              size={"icon"}
              className="bg-secondary/40"
            >
              <MoreVertical className="size-4 dark:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <Pencil className="mr-2 size-4" /> Edit course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${data.slug}`}>
                <Eye className="mr-2 size-4" /> Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`}>
                <Delete className="mr-2 size-4 text-destructive" /> Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        src={thumbnailUrl ?? ""}
        alt={"Tumbnail Url"}
        width={600}
        height={400}
        className="aspect-video h-full w-full rounded-t-lg object-cover"
      />
      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${data.id}/edit`}
          className="line-clamp-2 text-lg font-medium transition-colors group-hover:text-primary! hover:underline"
        >
          {data.title}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-tight text-muted-foreground">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-2">
            <TimerIcon className="size-6 rounded-md bg-primary/10 p-1 text-primary" />
            <p className="text-sm text-muted-foreground">{data.duration}h</p>
          </div>
          <div className="flex items-center gap-2">
            <School className="size-6 rounded-md bg-primary/10 p-1 text-primary" />
            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
        </div>
        <Link
          className={buttonVariants({ className: "mt-4 w-full" })}
          href={`/admin/courses/${data.id}/edit`}
        >
          Edit Course <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  )
}

export default AdminCourseCard

export const AdminCourseCardSkeleton = () => {
  return (
    <Card className="group relative gap-0 py-0">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="size-8 rounded-md" />
      </div>

      <div className="relative h-fit w-full">
        <Skeleton className="aspect-video h-62.5 w-full rounded-t-lg object-cover" />
      </div>

      <CardContent className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4 rounded" />
        <Skeleton className="mb-4 h-6 w-full rounded" />

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        </div>

        <Skeleton className="mt-4 h-10 w-full rounded" />
      </CardContent>
    </Card>
  )
}
