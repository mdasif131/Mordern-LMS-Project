import { getAllCourses } from "@/app/data/course/get-all-courses"
import PublicCourseCard, { PublicCourseCardSkeleton } from "../_components/PublicCourseCard"
import EmptyState from "@/components/general/EmptyState"
import { Suspense } from "react"

const PublicCoursesroute = () => {
  return (
    <div className="mt-5">
      <div className="mb-10 flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals.
        </p>
      </div>
      <Suspense fallback={<PublicCourseCardLayout/>}>
        <RenderCourses />
      </Suspense>
    </div>
  )
}
export default PublicCoursesroute

const RenderCourses = async () => {
  const courses = await getAllCourses()
  return (
    <>
      {courses.length === 0  ? (
        <EmptyState
          title="Product item"
          description="Product not avilable"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <PublicCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  )
}
function PublicCourseCardLayout () {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.from({ length: 6 }).map((_, index) => (
    <PublicCourseCardSkeleton key={index} />
  ))}
</div>
  )
}