import { Injectable } from "@nestjs/common";
import { Calling, CallingMessage } from "../calling/calling.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { QueryCallingInput } from "../calling/calling.entity";

@Injectable()
export class GluedogService {
  constructor() // @InjectModel(Calling.name)
  // private readonly callingModel: Model<Calling>,
  // @InjectModel(Calling.name)
  // private readonly callingMessageModel: Model<CallingMessage>
  {}
  async createVoice(user: any, body: any) {
    //TODO create voice
  }
  async createMessage(user: any, body: any) {
    //TODO create message
  }
  // async queryCalling(user: any, input: QueryCallingInput) {
  //   //TODO create message
  //   return await this.callingModel.find({
  //     company: user.company,
  //     user: user.user,
  //     to_phone_number: input.to_phone_number,
  //   });
  // }
}
