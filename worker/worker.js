const {parentPort} = require('worker_threads');
const os = require('os');


const THREAD_COUNT = os.cpus().length;

console.log('parentPort', THREAD_COUNT);

let counter = 0;
for(let i=0; i<20_000_000_000/ THREAD_COUNT; i++){
    console.log("counter", counter);
    counter += 1;

}


parentPort.postMessage(counter);
