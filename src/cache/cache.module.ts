import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { MemcachedModule } from '@nestcloud/memcached';

@Module({
  imports: [
   
  ],
  providers: [CacheService],
  controllers: [CacheController]
})
export class CacheModule {}
