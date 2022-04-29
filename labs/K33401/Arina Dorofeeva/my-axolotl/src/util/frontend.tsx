const api = (
  input: RequestInfo,
  init?: Omit<RequestInit, "body"> & { body?: any } | undefined
): Promise<any> => {
  const body = init?.body ? {
    body: JSON.stringify(init.body)
  } : null
  const contentType = init?.method !== 'GET' ? {
    'Content-Type': 'application/json'
  } : null
  return fetch(input, {
    ...init,
    ...body,
    headers: {
      ...contentType,
      ...init?.headers
    }
  })
    .then(r => r.json().then(body => [r.ok, body]))
    .then(([ok, body]) => {
      if (!ok)
        throw new Error(body.error)
      return body
    })
}

export { api }
