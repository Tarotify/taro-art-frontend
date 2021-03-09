// React Vue中使用需要封装worker.js

// export default function LoopWorker(worker) {

//     const responseBack = () => {
//         worker.postMessage('Thank you')
//     }
    
//     worker.onmessage = (event) => {
//         console.log('recieved'+  event.data)
//         // do something
//         responseBack()
//     }

//     const code = worker.toString();
//     const blob = new Blob(["(" + code + ")()"]);
//     return new Worker(URL.createObjectURL(blob));
// }

export default function LoopWorker() {
    this.onmessage = event => { 
        // Write your code here...
        console.log('[WORKER] recieved   '+  event.data)
        postMessage('Thank you')
    };
    this.postMessage('Thank you1')
}