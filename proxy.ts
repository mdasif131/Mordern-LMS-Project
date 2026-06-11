
// import { getSessionCookie } from "better-auth/cookies"

// export async function proxy(request: NextRequest) {
//   const sessionCookie = getSessionCookie(request)

//   if (!sessionCookie) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/admin/:path*"], // Specify the routes the middleware applies to
// }

import arcjet, { createMiddleware, detectBot } from "@arcjet/next"
import { env } from "./lib/env"
import { getSessionCookie } from "better-auth/cookies"
import { NextRequest, NextResponse } from "next/server"
const aj = arcjet({
  key: env.ARCJET_KEY!, 
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",

        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
  ],
})
async function authProxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
}

// Pass any existing middleware with the optional existingMiddleware prop
export default createMiddleware(aj, async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return await authProxy(request)
  }
  return NextResponse.next()
})
