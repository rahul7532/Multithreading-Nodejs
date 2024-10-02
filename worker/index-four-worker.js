const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

const {Worker} = require('worker_threads');

const os = require('os');


const THREAD_COUNT = os.cpus().length;

console.log('parentPort', THREAD_COUNT);

const app = express();

const PORT = 5000;

app.use('/', mainRoutes);

// app.use((req, res, next) => {
//     console.log(`${req.method} request for '${req.url}'`);
//     next(); // middleware to handle the request
// })

// app.use((req, res, next) => {
//     res.status(404).send('404-NotFound');
//  })

function createWorker(req, res){
    return new Promise((resolve, reject) => {
        const worker = new Worker('./four-worker.js', {
            workerData:{thread_count:THREAD_COUNT}
        })

            worker.on("message",(data)=>{
                resolve(data);

            })
            worker.on("error",(error)=>{
                reject(error);
                console.log("worker error", error);
            });

    });
}

//  const worker = new Worker('./worker/worker.js')

app.listen(PORT,() => {
    console.log('listening on port', PORT)
})

module.exports = {createWorker};
