const express = require('express');

const router = express.Router();
const os = require('os');

const createWorker = require('../worker/index-four-worker');



console.log("Starting", createWorker)
const THREAD_COUNT = os.cpus().length;

router.get('/', (req, res)=>{
    res.send('Welcome to main page');
})

router.get('/blocking', async(req, res)=>{
    // let counter = 0;
    // for(let i=0; i<20_000_000_000; i++){
    //     console.log("counter", counter);
    //     counter += 1;

    // }
    // res.status(200).send('Result is '+counter);

    const workerPromises = [];
  for(let i=0; i<THREAD_COUNT; i++){
      
    workerPromises.push(Promise.all(createWorker()))
    }
    res.status(200).send('Result is '+counter);
    


})

router.get('/non-blocking', (req, res)=>{
    res.send('This is non-blocking page');
})

router.get('/about', (req, res)=>{
    res.send('Welcome to about page');
})

module.exports = router;