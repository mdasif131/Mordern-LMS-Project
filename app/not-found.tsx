"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Badge */}
        <Badge className="mb-6 rounded-full border border-primary/30 bg-primary/20 px-4 text-sm text-primary">
          Page Not Found
        </Badge>

        <h1 className="mb-4 text-7xl font-bold tracking-tight md:text-8xl">
          404
        </h1>

        <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
          Oops! This page doesn&apos;t exist
        </h2>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The page you are looking for may have been removed, renamed, or is
          temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className={buttonVariants()}>
            <Home size={18} />
            Back Home
          </Link>

          <Button onClick={() => router.back()} variant={"outline"}>
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>

        {/* Optional Quick Links */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/courses"
            className="group rounded-xl border p-5 shadow-xl transition-colors hover:bg-[#162447]! dark:border-[#1E2B52] dark:bg-[#111C3A]"
          >
            <div className="mb-3 flex justify-center">
              <Search className="text-primary" />
            </div>
            <h3 className="mb-1 font-semibold group-hover:text-white dark:text-white">
              Courses
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore available learning resources.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-[#1E2B52] bg-[#111C3A] p-5 transition hover:bg-[#162447]"
          >
            <div className="mb-3 flex justify-center">📊</div>
            <h3 className="mb-1 font-semibold text-white">Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              View your learning progress.
            </p>
          </Link>

          <Link
            href="/signin"
            className="group rounded-xl border p-5 shadow-xl transition-colors hover:bg-[#162447]! dark:border-[#1E2B52] dark:bg-[#111C3A]"
          >
            <div className="mb-3 flex justify-center">🔐</div>
            <h3 className="mb-1 font-semibold group-hover:text-white dark:text-white">
              Sign In
            </h3>
            <p className="text-sm text-muted-foreground">
              Access your account securely.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
