import { buttonVariants } from "@/components/ui/button"
import { LmsLogo } from "@/constants/Icon"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeft className="size-4" />
          Go Back
        </Link>
      </div>
      <Link href={"/"}>
        <LmsLogo />
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          By cliking continue, you agree to out{" "}
          <span className="hover:text-primary hover:underline hover:cursor-pointer">
            Terms of service {''}
          </span>
          and <span className="hover:text-primary hover:underline hover:cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}
