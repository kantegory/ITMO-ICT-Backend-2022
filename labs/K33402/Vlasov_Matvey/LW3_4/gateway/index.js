const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use('/users', proxy('http://localhost:8002'))
app.use('/', proxy('http://localhost:8001'))

app.listen(8000, () => {
    console.log(`Running server on port 8000`)
})