
import { Suspense } from "react"
import VerifyRequest from "./_components/VerifyRequest"

const VerifyRequestPage = () => {
 
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <VerifyRequest />
    </Suspense>
  )
}

export default VerifyRequestPage
