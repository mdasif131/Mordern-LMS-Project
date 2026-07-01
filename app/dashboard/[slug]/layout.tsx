import { ReactNode } from "react";
import CourseSidebar from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface iAppProps{
  params: Promise<{ slug: string }>;
  children: ReactNode;
}
export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;

  // Server-side security check  and lightweight data fetching 
  const course = await getCourseSidebarData(slug);
  return (
    <div className="flex flex-1 ">
      {/* sider -30%  */}
      <div className="w-85 shrink-0 border-r border-border">
        <CourseSidebar course={course.course} />
      </div>

      {/* Main Content  - 70% */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}