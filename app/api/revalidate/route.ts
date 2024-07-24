import { revalidatePath, revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function GET(request: NextRequest): Promise<Response> {
  const tag = request.nextUrl.searchParams.get("tag")
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.PAYLOAD_PUBLIC_REVALIDATION_KEY) {
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      test: secret,
      otherSecret: process.env.PAYLOAD_PUBLIC_REVALIDATION_KEY,
    })
  }

  if (typeof tag === "string") {
    // there is a known bug with `revalidatePath` where it will not revalidate exact paths of dynamic routes
    // instead, Next.js expects us to revalidate entire directories, i.e. `/[slug]` instead of `/example-page`
    // for now we'll make this change but with expectation that it will be fixed so we can use `revalidatePath('/example-page')`
    // - https://github.com/vercel/next.js/issues/49387
    // - https://github.com/vercel/next.js/issues/49778#issuecomment-1547028830
    // revalidatePath(path)
    revalidateTag(tag)
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      tag,
      test: "now",
    })
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    tag,
    test: "nope",
  })
}
