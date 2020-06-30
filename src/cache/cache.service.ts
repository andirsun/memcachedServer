import { Injectable } from '@nestjs/common';
var Memcached = require('memcached');

@Injectable()
export class CacheService {
  
  constructor(){
    
  }
  memcached = new Memcached('localhost:11211', {retries:10,retry:10000,remove:true,failOverServers:['192.168.0.103:11211']});
  

  async setKey(key : string, value :string , lifeTime : number){
    this.memcached.connect( '192.168.0.103:11211', function( err, conn ){
      if( err ) throw new Error( err );
      console.log( conn.server );
    });
    return new Promise((resolve,reject) =>{

      this.memcached.set('foo', 'bar', 10, function (err) {
        if (err) return reject(err);
        resolve(true)
    })  
    });
  }

  async touchKey(key :string, lifeTime: number){
    return this.memcached.touch(key, lifeTime,err =>{
      console.log(err);
    });
  }

  async getValueObject(key : string){
    return this.memcached.get(key, function (err, data) {
      console.log(`Key ${key} : ${data}`);
      if(err) {
        console.log(err);
      }
    });
  }

  
}
