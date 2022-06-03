import { channel } from "diagnostics_channel";

const express = require('express');
const cors  = require('cors');
const { customer } = require('./api');



module.exports = async (app: any, channel: any) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    // app.use((req,res,next) => {
    //     console.log(req);
    //     next();
    // })

    //Listen to Events //
    //appEvents(app);

    //api
    customer(app, channel);
    
}