"use client"
import { Badge } from "@/components/ui/badge"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Home() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  async function signOUt() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          toast.success("Signout successfully")
        },
      },
    })
  }
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge>The Future of Online Education</Badge>
        </div>
      </section>
    </>
  )
}
