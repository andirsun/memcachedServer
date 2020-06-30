import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache/cache.module';
//import { MemcachedModule } from '@nestcloud/memcached';

@Module({
  imports: [
    CacheModule,
    // MemcachedModule.register({
    //   uri: [
    //      '192.168.0.102:11211',
    //      '192.168.0.103:11211',
    //      '192.168.0.104:11211'
    //   ],
    //   retries: 3
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
