import { Controller, Get, Res, HttpStatus, Query, Post, Body, Put } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CreateCacheObjectDTO } from './dto/cacheObject.dto';

@Controller('cache')
export class CacheController {

  constructor(
    private cacheService : CacheService
  ){}

  @Post('/setKey')
  async setKey(@Res() res,@Body()createCacheObjectDTO : CreateCacheObjectDTO){
    // Usign the cache service to save the key -> value in the memcache server
    this.cacheService.setKey(createCacheObjectDTO.key,createCacheObjectDTO.value,parseInt(createCacheObjectDTO.lifeTime))
      .then(response =>{
        // afirmative
        return res.status(HttpStatus.OK).json({
          response: true,
          content: {
            message : `Key ${createCacheObjectDTO.key} was saved!`
          }
        });
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            message : `Key ${createCacheObjectDTO.key} wasnt saved!`,
            err
          }
        });
      });
  }

  @Get('/getKey')
  async getKey(@Res() res,@Query('key')key : string){
    // Usign the cache service to save the key -> value in the memcache server
    this.cacheService.getKeyValue(key)
      .then(value =>{
        // afirmative
        if(value){
          return res.status(HttpStatus.OK).json({
            response: true,
            content: {
              value
            }
          });
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            response: false,
            content: {
              message : `Key : ${key} expired or not found`
            }
          });
        }
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            err
          }
        });
      });
  }

  @Get('/getsKey')
  async getsKey(@Res() res,@Query('key')key : string){
    // Usign the cache service to save the key -> value in the memcache server
    this.cacheService.getsKeyValue(key)
      .then(value =>{
        // afirmative
        if(value){
          return res.status(HttpStatus.OK).json({
            response: true,
            content: {
              key : value
            }
          });
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            response: false,
            content: {
              message : `Key : ${key} expired or not found`
            }
          });
        }
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            err
          }
        });
      });
  }

  @Put('/replaceKeyValue')
  async reaplaceKeyValue(@Res() res,@Body()body : any){
    //Setting properties
    let keyName : string = body.key;
    let newValue : string = body.newValue;
    let lifeTime : number = parseInt(body.lifeTime);
    //Memcache service powered by memcache api
    this.cacheService.replaceValueofKey(keyName,newValue,lifeTime)
      .then(value =>{
        // afirmative
        if(value){
          return res.status(HttpStatus.OK).json({
            response: true,
            content: {
              message : `The key was updated succesfully`
            }
          });
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            response: false,
            content: {
              message : `Key : ${body.key} expired or not found`
            }
          });
        }
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            err
          }
        });
      });
  }

  @Put('/appendValueToKey')
  async appendValueToKey(@Res() res,@Body()body : any){
    //Setting properties
    let keyName : string = body.key;
    let newValue : string = body.newValue || "";
    //Memcache service powered by memcache api
    this.cacheService.appendValueToKey(keyName,newValue)
      .then(value =>{
        // afirmative
        if(value){
          return res.status(HttpStatus.OK).json({
            response: true,
            content: {
              message : `The key was updated succesfully`
            }
          });
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            response: false,
            content: {
              message : `Key : ${body.key} expired or not found`
            }
          });
        }
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            err
          }
        });
      });
  }

  @Put('/prependValueToKey')
  async prependValueToKey(@Res() res,@Body()body : any){
    //Setting properties
    let keyName : string = body.key;
    let newValue : string = body.newValue || "";
    //Memcache service powered by memcache api
    this.cacheService.prependValueToKey(keyName,newValue)
      .then(value =>{
        // afirmative
        if(value){
          return res.status(HttpStatus.OK).json({
            response: true,
            content: {
              message : `The key was updated succesfully`
            }
          });
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            response: false,
            content: {
              message : `Key : ${body.key} expired or not found`
            }
          });
        }
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            err
          }
        });
      });
  }

  @Put('/casValueKey')
  async casValueToKey(@Res() res,@Body()body : any){
    //Setting properties
    let keyName : string = body.key;
    let value : string = body.value || "";
    let lifeTime : number = body.lifeTime || 10;
    
    //Memcache service powered by memcache api
    this.cacheService.casValueToKey(keyName,value,lifeTime)
      .then(value =>{
        // afirmative
        if(value){
          return res.status(HttpStatus.OK).json({
            response: true,
            content: {
              value
            }
          });
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            response: false,
            content: {
              message : `Key do not match`
            }
          });
        }
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            err
          }
        });
      });
  }

}
