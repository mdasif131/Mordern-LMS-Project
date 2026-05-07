"use client"
import { ModeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Home() {
  const { data: session } = authClient.useSession()
  const router = useRouter();
  async function signOUt() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
          toast.success('Signout successfully')
        }
      }
    })
  }
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          <ModeToggle />
        </div>
        <div>
          {session ? (
            <>
              <p>{session.user.name}</p><Button onClick={signOUt}>Signout</Button>
            </>
          ) : (
            <>
              <Button>Login</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
