"use client"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useConfetti } from "@/hooks/use-confetti"
import { ArrowLeft, CheckIcon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const PaymentSuccessPage = () => {
  const { triggerConfetti } = useConfetti()
  useEffect(() => {
    triggerConfetti()
  }, [])
  return (
    <div className="flex min-h-screen w-full flex-1 items-center justify-center">
      <Card className="w-87.5">
        <CardContent>
          <div className="flex justify-center">
            <CheckIcon className="size-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-semibold">Payment Succesful</h2>
            <p className="mt-2 text-sm tracking-tight text-balance text-muted-foreground">
              Congrats your payment was successfull. You should now have access
              to the course!
            </p>

            <Link
              href={"/dashboard"}
              className={buttonVariants({ className: "mt-2 w-full" })}
            >
              <ArrowLeft className="size-4" />
              Go back to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentSuccessPage
