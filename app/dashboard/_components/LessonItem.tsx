import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Play } from "lucide-react"
import Link from "next/link"

interface iAppProps {
  lesson: {
    id: string
    title: string
    position: number
    description: string | null
  }
  slug: string
}
const LessonItem = ({ lesson, slug }: iAppProps) => {
  const completed = true;
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "h-auto w-full justify-start p-2.5 px-2! transition-all",
          completed &&
            "border-green-300 bg-green-100 text-green-800! hover:bg-green-200 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50"
        ),
      })}
    >
      <div className="flex w-full min-w-0 items-center gap-2.5">
        <div className="shrink-0">
          {completed ? (
            <div>
              <Check className="size-3 text-primary" />
            </div>
          ) : (
            <div
              className={cn(
                "flex size-5 items-center justify-center rounded-full border-2 border-primary/20 bg-background"
              )}
            >
              <Play className={cn("size-1.8 fill-primary/80 stroke-none")} />
            </div>
          )}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className={cn("truncate! text-xs font-medium", completed && "text-green-800 dark:text-green-200")}>
            {lesson.position}. {lesson.title}
          </p>
          {completed && (<p className="text-[10px] text-green-700 dark:text-green-300 font-medium">Completed</p>)}
        </div>
      </div>
    </Link>
  )
}

export default LessonItem
