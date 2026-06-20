import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, XIcon } from "lucide-react"
import Link from "next/link"

const PaymentCancelPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-1 items-center justify-center">
      <Card className="w-87.5">
        <CardContent>
          <div className="flex justify-center">
            <XIcon className="size-12 rounded-full bg-red-500/30 p-2 text-red-500" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="mt-2 text-sm tracking-tight text-balance text-muted-foreground">
              No worries, you won&apos;t be charged. Please try again!
            </p>

            <Link
              href={"/"}
              className={buttonVariants({ className: "w-full mt-2" })}
            >
              <ArrowLeft className="size-4"/>
              Go back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentCancelPage
