"use client"

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { enrollInCourseAction } from "../action";

const EnrollmentButton = ({courseId}:{courseId:string}) => {
  const [pending, startTransition] = useTransition();


  function onSubmit() {
     startTransition(async () => { 
       const { data:result, error } = await tryCatch(enrollInCourseAction(courseId))
       if (error) {
         console.log(error)
         toast.error("An unexpected error occurred. Please try again.")
         return
       }
       if (result.status === 'success') {
         toast.success(result.message)
       } else if (result.status === 'error') { 
         toast.error(result.message)
       }
     })
   }
  return (
    <Button onClick={onSubmit} disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader className="size-4 animate-spin" /> Enrolling...
        </>
      ) : (
        "Enroll Now"
      )}
    </Button>
  )
}

export default EnrollmentButton