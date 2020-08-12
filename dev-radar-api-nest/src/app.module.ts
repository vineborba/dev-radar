import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevsModule } from './devs/devs.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://sudo:Vini12345@omnicluster-ykmfn.mongodb.net/omnistack?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    DevsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
