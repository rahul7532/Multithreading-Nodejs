const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

const {Worker} = require('worker_threads');

const app = express();

const PORT = 5000;

app.use('/', mainRoutes);

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // middleware to handle the request
})

app.use((req, res, next) => {
    res.status(404).send('404-NotFound');
 })

//  const worker = new Worker('./worker/worker.js')

//  worker.on("message",(data)=>{})
//  worker.on("error",(error)=>{

//     console.log("worker error", error);
//  });

app.listen(PORT,() => {
    console.log('listening on port', PORT)
})