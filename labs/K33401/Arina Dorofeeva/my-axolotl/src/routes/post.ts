import express from "express"
const proxy = require('http-proxy-middleware')
const apiProxy = proxy('/*', {target: 'http://my-axolotl:8081/'})

const router = express.Router()

router.use(apiProxy)

export default router
