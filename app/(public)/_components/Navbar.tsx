"use client"
import { ModeToggle } from "@/components/ThemeToggle"
import { buttonVariants } from "@/components/ui/button"
import { LmsLogo } from "@/constants/Icon"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import UserDropdown from "./UserDropdown"


interface NavProps {
  name: string
  href: string
}
const navigationItems: NavProps[] = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dasboard", href: "/dashboard" },
]
const Navbar = () => {
  const { data: session, isPending } = authClient.useSession()
  console.log(session)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-x-4 px-4 md:px-6 lg:px-8">
        <Link href={"/"} className="-m-12 sm:-m-8">
          <LmsLogo className="w-50 md:w-55" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden gap-4 md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isPending ? null : session ? (
              <UserDropdown name={session.user.name} email={session.user.email} image={session.user.image ?? ""} />
            ) : (<>
            <Link href={"/login"} className={buttonVariants({variant:'secondary'})}>Login</Link>
                <Link href={"/login"} className={buttonVariants()}>Get started</Link>
            </>)}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
