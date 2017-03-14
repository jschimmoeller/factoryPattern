import Factory from './factory';


const F = new Factory();
F.registerFinished(()=>{
  console.log('Factory is Finished')
})

for(let i = 0; i < 6; i++){
  F.addWork(i);
};
