import { adminGetCourse } from "@/app/data/admin/admin-get-course"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditCourseForm from "./_components/EditCourseForm"
import CourseStructrue from "./_components/CourseStructrue"

type Params = Promise<{ courseId: string }>
const EditCoursePage = async ({ params }: { params: Params }) => {
  const { courseId } = await params
  const data = await adminGetCourse(courseId)
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Course:{" "}
        <span className="text-primary underline">{data.title}</span>
      </h1>
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structre">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structre">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
               Heare you can update your Course Structure
              </CardDescription>
            </CardHeader>
            <CardContent><CourseStructrue data={data}/></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditCoursePage
