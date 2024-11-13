import { Module } from "@nestjs/common";
import { GuledogController } from "./gluedog.controller";
import { GluedogService } from "./gluedog.service";
import { MongooseModule } from "@nestjs/mongoose";
// import {
//   Calling,
//   CallingMessage,
//   CallingMessageSchema,
//   CallingSchema,
// } from "./calling.model";
// import { CallingResolver } from "./calling.resolver";
@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: Calling.name, schema: CallingSchema },
    //   { name: CallingMessage.name, schema: CallingMessageSchema },
    // ]),
  ],
  controllers: [GuledogController],
  providers: [GluedogService],
})
export class GlueDogModule {}
