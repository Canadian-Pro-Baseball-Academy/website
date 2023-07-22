interface IRequest {
  collection: string
  query: string
  variables?: object
  options?: RequestOptions
  token?: any
  draft?: boolean
}

type RequestOptions = {
  /**
   * Configure how the request should interact with Next.js HTTP cache. Possible values:
   *
   * * false - Cache the resource indefinitely (default)
   * * 0 - Prevent the resource from being cached.
   * * number - (in seconds) Specify the resource should have a cache lifetime of at most n seconds.
   */
  revalidate?: number | false
  tags?: string[]
}

export async function request<T = any>({
  collection,
  query,
  variables,
  options,
  token,
  draft = false,
}: IRequest): Promise<T> {
  const payloadToken = token || null
  const next = {
    ...(options?.tags
      ? { tags: options.tags }
      : {
          revalidate: options?.revalidate,
        }),
  }

  const { data, errors } = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/graphql?${collection}`,
    {
      method: "POST",
      headers: {
        // ...(draft &&
        //   payloadToken && { Authorization: `JWT ${payloadToken?.value}` }),
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["pages"],
      },
      body: JSON.stringify({
        query: query,
        variables: {
          draft,
          ...variables,
        },
      }),
    }
  ).then((res) => res.json())

  if (errors) {
    console.error(JSON.stringify(errors)) // eslint-disable-line no-console
    throw new Error(errors)
  }

  return data
}
