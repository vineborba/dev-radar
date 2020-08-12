import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { DevsController } from "./devs.controller";
import { DevsService } from "./devs.service";
import { DevSchema } from "./devs.model";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: 'devs',
        schema: DevSchema,
      }
    ])
  ],
  controllers: [DevsController],
  providers: [DevsService], 
})
export class DevsModule {};