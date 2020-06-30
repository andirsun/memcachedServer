import { Controller, Get, Res, HttpStatus, Query, Post, Body } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {

  constructor(
    private cacheService : CacheService
  ){}

  @Post('/setKey')
  async setKey(@Res() res,@Body()body : any){
    // Usign the cache service to save the key -> value in the memcache server
    this.cacheService.setKey(body.key,body.value,body.lifeTime)
      .then(response =>{
        // afirmative
        return res.status(HttpStatus.OK).json({
          response: true,
          content: {
            message : `Key ${body.key} was saved!`
          }
        });
      })
      .catch(err=>{
        // handling promise error
        return res.status(HttpStatus.BAD_REQUEST).json({
          response: false,
          content: {
            message : `Key ${body.key} wasnt saved!`,
            err
          }
        });
      });
  }
}
