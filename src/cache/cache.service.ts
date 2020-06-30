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
  

  async setKey(key : string, value : any , timeExp:number) : Promise<boolean>{
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api to set a key
      memcached.set(key, value, timeExp, function (err) {
        if (err) return reject(err);
        resolve(true)
      });  
    });
  }

  async touchKey(key :string, lifeTime: number){
    return memcached.touch(key, lifeTime,err =>{
      console.log(err);
    });
  }

  async getKeyValue(key : string){
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api to get a key value
      memcached.get(key, function (err, data) {
        if (err) return reject(err);
        resolve(data)
      });  
    });
  }

  
}
