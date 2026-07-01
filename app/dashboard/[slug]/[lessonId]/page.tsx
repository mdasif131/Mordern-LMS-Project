import { getLessonContent } from "@/app/data/course/get-lesson-content";

type Params = Promise<{ lessonId: string }>;
const LessonContentPage = async ({ params }: { params: Params }) => {
  const {lessonId} = await params;
  const data = await getLessonContent(lessonId)

  return (
    <div>
      <h1>{data.lesson.title}</h1>
    </div>
  )
}

export default LessonContentPage