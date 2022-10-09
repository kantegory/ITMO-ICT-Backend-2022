import express from 'express'

export default async function useSafeHandler(
    request: express.Request,
    response: express.Response,
    handler: () => Promise<void>,
    errorCode = 400
) {
    try {
        await handler()
    } catch (e: any) {
        if (e.message)
            return response.status(errorCode).send({ error: e.message })
        return response.status(500).send({ error: e })
    }
}
