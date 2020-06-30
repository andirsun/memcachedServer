import { Controller, Get, Res, HttpStatus, Query, Post, Body } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ICacheObject } from './interfaces/cacheObject.interface';
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
}
