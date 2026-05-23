import { adminGetCourses } from "@/app/data/admin/admin-get-courses"
import EmptyState from "@/components/general/EmptyState"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import AdminCourseCard, { AdminCourseCardSkeleton } from "./_components/AdminCourseCard"

 const CoursesPage =() => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href={"/admin/courses/create"} className={buttonVariants()}>
          Create Course
        </Link>
      </div>
      <Suspense fallback={<AdminCoursesSkeletonLayout/>}>
        <RenderCourses />
      </Suspense>
    </>
  )
}
export default CoursesPage
const RenderCourses = async () => {
  const data = await adminGetCourses()
  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Create a new course to get started"
          buttonText="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {data.map((course) => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  )
} 
const AdminCoursesSkeletonLayout = () => {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  )
}