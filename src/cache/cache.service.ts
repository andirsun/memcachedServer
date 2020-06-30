import { Injectable } from '@nestjs/common';
const Memcached = require('memcached');// Memcached npm module
// Instance of memcached 
var memcached = new Memcached();

/*conection with memcached server*/ 
memcached.connect( 'localhost:11211', function( err, conection){
  /* first step: conection , before execute conection install memcached in the host with sudo apt-get install memcached*/
  if( err ) console.log( conection.server,'Error in conection to memcached server');
  else console.log("success conection");
});

@Injectable()
export class CacheService {
  
  constructor(){
    
  }
  

  async setKey(key : string, value :string , lifeTime : number){
    return new Promise((resolve,reject) =>{

      memcached.set('foo', 'bar', 10, function (err) {
        if (err) return reject(err);
        resolve(true)
    })  
    });
  }

  async touchKey(key :string, lifeTime: number){
    return memcached.touch(key, lifeTime,err =>{
      console.log(err);
    });
  }

  async getValueObject(key : string){
    return memcached.get(key, function (err, data) {
      console.log(`Key ${key} : ${data}`);
      if(err) {
        console.log(err);
      }
    });
  }

  
}
