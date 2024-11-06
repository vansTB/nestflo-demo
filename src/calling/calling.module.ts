import { Module } from "@nestjs/common";
import { CallingController } from "./calling.controller";
import { CallingService } from "./calling.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Calling,
  CallingMessage,
  CallingMessageSchema,
  CallingSchema,
} from "./calling.model";
import { CallingResolver } from "./calling.resolver";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calling.name, schema: CallingSchema },
      { name: CallingMessage.name, schema: CallingMessageSchema },
    ]),
  ],
  controllers: [CallingController],
  providers: [CallingService, CallingResolver],
})
export class CallingModule {}
