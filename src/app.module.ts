import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './modules/cache/infrastructure/cache.module';
//import { MemcachedModule } from '@nestcloud/memcached';

@Module({
  imports: [
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
