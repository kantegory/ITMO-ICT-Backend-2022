import express from 'express'
import { ObjectNotFoundError, ObjectPermisstionError } from '../errors'

export default async function useSafeHandler(
    request: express.Request,
    response: express.Response,
    handler: () => Promise<void>,
    errorCode = 400
) {
    try {
        await handler()
    } catch (e: any) {
        if (e instanceof ObjectPermisstionError) return response.status(403).send({error: 'Permission denied'})
        if (e instanceof ObjectNotFoundError) return response.status(404).send({error: 'Object not found'})
        if (e.message)
            return response.status(errorCode).send({ error: e.message })
        return response.status(500).send({ error: e })
    }
}
