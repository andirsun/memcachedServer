import { Injectable } from '@nestjs/common';
import { ICacheObject } from '../domain/interfaces/cacheObject.interface';
const Memcached = require('memcached');// Memcached npm module
// Instance of memcached 
var memcached = new Memcached();

/*conection with memcached server*/ 
memcached.connect( 'localhost:11211', function( err, conection){
  /* first step: conection , before execute conection install memcached in the host with sudo apt-get install memcached*/
  if( err ) console.log( conection.server,'ERROR in conection to MEMCACHED server');
  else console.log("SUCCESS conection to MEMCACHED server");
});

@Injectable()
export class CacheService {
  
  constructor(){
    
  }
  
  // this function Stores a new value in Memcached.
  public async setKey(key : string, value : string , timeExp:number) : Promise<boolean>{
    // Transform the callback into a promise to be used in the controller
    return await new Promise((resolve,reject) =>{
      // Using memcached api to set a key
      memcached.set(key, value, timeExp, function (err) {
        if (err) return reject(err);
        resolve(true)
      });  
    });
  }
  /*
    This function Get the value for the given key.
  */
  public async getKeyValue(key : string) : Promise<string>{
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api to get a key value
      memcached.get(key, function (err, data) {
        if (err) return reject(err);
        resolve(data)
      });  
    });
  }
  /*
    This function Check And Set (or Compare And Swap).
    An operation that stores data, but only if no one else has updated the data since you read it last. 
    Useful for resolving race conditions on updating cache data.
  */
  public async getsKeyValue(key : string):Promise<ICacheObject>{
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api to get a key value
      memcached.gets(key, function (err, data) {
        if (err) return reject(err);
        //data has 2 params data.key & data.cas
        resolve(data)
      });  
    });
  }
  /*
    this function Replaces the value in memcached
  */
  public async replaceValueofKey(key : string, newValue : string, lifeTime : number):Promise<boolean>{
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api to get a key value
      memcached.replace(key, newValue, lifeTime, function (err) { /* stuff */ 
        if (err) return reject(err);
        resolve(true)
      });  
    });
  }
  /*
    This function Add the given value string to the value of an existing item.
  */
  public async appendValueToKey(key : string, appendValue : any):Promise<boolean>{
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api
      memcached.append(key, appendValue, function (err) {
        if (err) return reject(err);
        resolve(true)
      });  
    });
  }
  /*
    This function Add the given value string to the end of value of an existing item.
  */
  public async prependValueToKey(key : string, prependValue : string):Promise<boolean>{
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api
      memcached.prepend(key, prependValue, function (err) {
        if (err) return reject(err);
        resolve(true)
      });  
    });
  }
  /*
    Check And Set (or Compare And Swap). An operation that stores data, but only if no one else has updated the data since you read it last.
    Useful for resolving race conditions on updating cache data.

    - key: String the name of the key
    - value: Mixed Either a buffer, JSON, number or string that you want to store.
    - lifetime: Number, how long the data needs to be replaced measured in seconds
    - cas: String the CAS value
  */
  public async casValueToKey(key : string, value : string, lifeTime : number):Promise<ICacheObject>{
    // Transform the callback into a promise to be used in the controller
    return new Promise((resolve,reject) =>{
      // Using memcached api 
      memcached.gets(key, function (err, data) {
        
        if (err) return reject(err);
        //data has 2 value , data.key & data.cas
        console.log(data);
        memcached.cas(key, value, data.cas, lifeTime, function (err) { /* stuff */ 
          if (err) return reject(err);
          resolve(data)
        });
        
      });
    });
  }

  public getHello(): string {
    return 'Hello World!';
  }



  
}
