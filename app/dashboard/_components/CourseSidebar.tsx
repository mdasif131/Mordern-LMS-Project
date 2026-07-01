import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, Play } from "lucide-react"
import LessonItem from "./LessonItem"

interface iAppProps {
  course: CourseSidebarDataType["course"]
}
const CourseSidebar = ({ course }: iAppProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border pr-4 pb-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Play className="size-5 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base leading-tight font-semibold">
              {course.title}
            </h1>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {course.category}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">4/10 lessons</span>
          </div>
          <Progress value={55} className="h-1.5" />
          <p className="text-xs text-muted-foreground">55% complete</p>
        </div>
      </div>

      <div className="space-y-3 py-4 pr-4">
        {course.chapter.map((chapter, index) => (
          <Collapsible key={chapter.id} defaultOpen={index === 0}>
            <CollapsibleTrigger asChild>
              <Button
                variant={"outline"}
                className="flex h-auto w-full items-center gap-2 p-3"
              >
                <div className="shrink-0">
                  <ChevronDown className="size-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div>
                    <p className="text-foreround truncate text-sm font-semibold">
                      {chapter.position} : {chapter.title}
                    </p>
                    <p className="truncate text-[10px] font-medium text-muted-foreground">
                      {chapter.lessons.length} lessons
                    </p>
                  </div>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3 border-l-2 pl-4">
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  slug={course.slug}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar
