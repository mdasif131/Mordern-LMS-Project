"use client"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface featureProps {
  title: string
  description: string
  icon: string
}
const features: featureProps[] = [
  {
    title: "Comprehaensive Courses",
    description:
      "Access a wide range of carefully curated courses  designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: "📝",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description:
      "join a vibrant community of learners and instructors to collaborate and share knowledge",
    icon: "👨‍👩‍👧‍👧",
  },
]

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
        <div className="flex flex-col items-center space-y-8 text-center">
          <Badge>The Future of Online Education</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Elevate You Learning Experience
          </h1>
          <p className="max-w-175 text-muted-foreground md:text-xl">
            Discover a new way to learn with out modern, interactive learning
            management system. Acess high-quality coures anytimve, anywhere.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link className={buttonVariants({ size: "lg" })} href={"/courses"}>
              Explore Courses
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href={"/login"}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div>{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  )
}
