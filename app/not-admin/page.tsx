"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { useRouter } from "next/navigation"

const NotAdmin = () => {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="relative  w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-background p-10 text-center shadow-sm">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-14 -right-14 z-20 h-44 w-44 rounded-full bg-[oklch(0.96_0.05_149.58)] opacity-50" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 z-20 h-28 w-28 rounded-full bg-[oklch(0.94_0.06_149.58)] opacity-40" />

        {/* Lock icon */}
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[oklch(0.93_0.08_149.58)]">
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="oklch(0.7227 0.192 149.5793)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {/* Status chip */}
        <div className="relative mb-4 inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.93_0.08_149.58)] px-4 py-1 font-mono text-xs font-semibold tracking-widest text-[oklch(0.45_0.14_149.58)] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7227_0.192_149.5793)]" />
          403 · Forbidden
        </div>

        {/* Heading */}
        <h1 className="d relative z-10 mb-2 text-[2rem] leading-tight font-semibold">
          Access Denied
        </h1>

        {/* Description */}
        <p className="relative z-10 mb-7 text-sm leading-relaxed text-muted-foreground">
          You don&apos;t have admin privileges to view this page. Contact your
          administrator to request access.
        </p>

        {/* Divider */}
        <div className="relative z-10 mb-6 h-px bg-slate-100" />

        {/* Action buttons */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          <Button
            onClick={() => router.back()}
            variant={"ghost"}
            className="border border-primary"
          >
            ← Go Back
          </Button>
          <Link href={'/'} className={buttonVariants()}>Go to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default NotAdmin
