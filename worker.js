
class Worker {
  constructor(id){
    this._status = 'idle'
    this._id = id;
    this.work = this.work.bind(this);
  }

  get status(){
    return this._status;
  }

  set status(x){
    this._status = x;
  }

  work(pathToWork){
    this.status = 'busy';

    return new Promise((resolve, reject)=>{
      setTimeout(() =>{
        this.status = 'idle';
        resolve({pathToWork, id: this._id});

      }, 2000);
    })
  }
}

export default Worker;
