interface IRequest {
  collection: string;
  query: string;
  variables?: object;
  options?: RequestOptions;
  token?: any;
  draft?: boolean;
}

type RequestOptions = {
  /**
   * Configure how the request should interact with Next.js HTTP cache. Possible values:
   *
   * * false - Cache the resource indefinitely (default)
   * * 0 - Prevent the resource from being cached.
   * * number - (in seconds) Specify the resource should have a cache lifetime of at most n seconds.
   */
  revalidate?: number | false;
};

export async function request<T = any>({
  collection,
  query,
  variables,
  options,
  token,
  draft = false,
}: IRequest): Promise<T> {
  const payloadToken = token || null;
  const revalidate = options?.revalidate ?? 0;

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
        revalidate,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          draft,
          ...variables,
        },
      }),
    }
  ).then((res) => res.json());

  if (errors) {
    console.error(JSON.stringify(errors)); // eslint-disable-line no-console
    throw new Error(errors);
  }

  return data;
}
