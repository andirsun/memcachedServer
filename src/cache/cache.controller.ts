import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {

  constructor(
    private cacheService : CacheService
  ){}

  @Get('/test')
  async testCache(@Res() res){
    this.cacheService.setKey('first','hola mundo',3600)
      .then(response =>{
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    // this.cacheService.setKey('first','hola mundo',3600)
    //   .then(response =>{
        
    //     this.cacheService.getValueObject('first')
    //     .then(value=>{
          
    //     }) 
    //   })
    
    return res.status(HttpStatus.OK).json({
      response: 2,
      content: {
        
      }
    });
  }
}
