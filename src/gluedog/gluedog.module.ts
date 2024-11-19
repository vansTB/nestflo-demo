import { Module } from "@nestjs/common";
import { GluedogController } from "./gluedog.controller";
import { GluedogService } from "./gluedog.service";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import {
  GluedogBranches,
  GluedogBranchesSchema,
  GluedogInfo,
  GluedogInfoSchema,
  Guest,
  GuestInfoSchema,
} from "./gluedog.model";
import { GluedogTask } from "./gluedog.task";

// import {
//   Calling,
//   CallingMessage,
//   CallingMessageSchema,
//   CallingSchema,
// } from "./calling.model";
// import { CallingResolver } from "./calling.resolver";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GluedogInfo.name, schema: GluedogInfoSchema },
      { name: GluedogBranches.name, schema: GluedogBranchesSchema },
      { name: Guest.name, schema: GuestInfoSchema },
    ]),
    HttpModule,
  ],
  controllers: [GluedogController],
  providers: [GluedogService, GluedogTask],
})
export class GlueDogModule {}
