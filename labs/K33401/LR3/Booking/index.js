const express = require('express');

const app = express();

app.use(express.json());


app.listen(8003, () => {
    console.log('Booking is Listening to Port 8003')
})