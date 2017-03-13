import Worker from './worker';

let workers;
let queue;

let subscription;

class Factory {
  constructor(nbrWorks=2, cb=(msg)=>{console.log(msg)}){
    workers = [];
    queue = [];
    // building workers
    'a'.repeat(nbrWorks).split('a').map((item, index)=>{
      workers[index] = new Worker(index);
    });

    subscription = cb;

    this.addWork = this.addWork.bind(this);
    this.isFinished = this.isFinished.bind(this);
  }

  isFinished() {
    return queue.length === 0;
  }

  addWork(pathToWork){
    console.log('factory add work called ');
    //validate
    this.doWork(pathToWork);
  }

  workFinished(err, data){
      if (err){
        //do x
      }
      subscription('work finished ' + JSON.stringify(data) )
      if (queue.length > 0 ){
        const newJob = queue.shift();
        this.doWork(newJob);
      } else {
        subscription('nothing left' )
      }
  }

  doWork(pathToWork){
    const myWorker = this.getNextAvailableWorker();
    //console.log('myWorker', myWorker ? myWorker._id : 'aaaaaa')
    if (myWorker){
      const p = myWorker.work(pathToWork).then((data)=>{
        //console.log('cccccc', data)
        this.workFinished(undefined, data);
      }).catch((data)=>{
        this.workFinished(data, data);
      });
    } else {
      queue.push(pathToWork);
    }
  }

  getNextAvailableWorker(){
    const myWorkers = workers.filter((w)=>{
      //console.log('wwwww:', w._id, w.status );
      if (w.status === 'idle'){
        return w;
      }
    });

    //console.log('-----', myWorkers.length)
    if (myWorkers.length > 0 ){
      return myWorkers[0];
    }

    return undefined;
  }
}

export default Factory;
