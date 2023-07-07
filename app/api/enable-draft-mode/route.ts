import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  }
): Promise<Response> {
  const payloadToken = req.cookies.get("payload-token")?.value;
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("redirect");
  const secret = searchParams.get("secret");

  if (!slug) {
    return new Response("No URL provided", { status: 404 });
  }

  // TODO: Enable authentication for preview mode
  // if (!payloadToken) {
  //   new Response("No Token: You are not allowed to preview this page", {
  //     status: 403,
  //   });
  // }

  // const userReq = await fetch(
  //   `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/me`,
  //   {
  //     headers: {
  //       Authorization: `JWT ${payloadToken}`,
  //     },
  //     credentials: "include",
  //   }
  // );

  // const userRes = await userReq.json();

  // if (!userReq.ok || !userRes?.user) {
  //   draftMode().disable();
  //   return new Response(
  //     `No User: You are not allowed to preview this page.  Token: ${payloadToken}, User: ${JSON.stringify(
  //       userRes
  //     )}`,
  //     {
  //       status: 403,
  //     }
  //   );
  // }

  if (secret !== process.env.PAYLOAD_PUBLIC_DRAFT_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  draftMode().enable();

  redirect(slug);
}
