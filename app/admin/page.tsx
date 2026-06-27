import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive"
import { SectionCards } from "@/components/sidebar/section-cards"
import { adminGetEnrollmentChartInfo } from "../data/admin/admin-get-enrollment-chart-info"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses"
import EmptySate from "@/components/general/EmptyState"
import AdminCourseCard, { AdminCourseCardSkeleton } from "./courses/_components/AdminCourseCard"
import { Suspense } from "react"
export default async function AdminIndexPage() {
  const enrollmentData = await adminGetEnrollmentChartInfo()
  return (
    <>
      <SectionCards />
      <div className="px-4">
        <ChartAreaInteractive data={enrollmentData} />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link className={buttonVariants({variant:'outline'})} href={"/admin/courses"}>View All Courses</Link>
        </div>

        <Suspense fallback={<RecentCourseSkeletonLayout/>}>
          <RenderRecentCourses/>
        </Suspense>
      </div>
    </>
  )
}
 
async function RenderRecentCourses() {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
     <EmptySate  buttonText="Create new Course" description="You dont have any courses.create some to see them here" title="You dont have any coureses yet!" href="/admin/courses/create" />
   )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
   ))}
    </div>
  )
}

function RecentCourseSkeletonLayout () {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
  {Array.from({ length: 2 }).map((_, index) => (
    <AdminCourseCardSkeleton key={index} />
  ))}
</div>
  )
}