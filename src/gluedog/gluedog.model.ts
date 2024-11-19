import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
@Schema({
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  collection: "gluedog_info",
})
export class GluedogInfo {
  @Prop()
  appId: string;
  @Prop()
  authorizationToken: string;

  @Prop()
  accessToken: string;
  @Prop()
  refreshToken: string;
  @Prop()
  expiresIn: number;
  @Prop({ default: new Date(1970) })
  push_gule_at: Date;
  @Prop()
  created_at: Date;
  @Prop()
  updated_at: Date;
}

export const GluedogInfoSchema = SchemaFactory.createForClass(GluedogInfo);

@Schema({
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  collection: "gluedog_branches",
})
export class GluedogBranches {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  company: ObjectId;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  functionality: any;

  @Prop()
  name: string;

  @Prop({ default: new Date(1970) })
  push_gule_at: Date;
  @Prop()
  created_at: Date;
  @Prop()
  updated_at: Date;
}

export const GluedogBranchesSchema =
  SchemaFactory.createForClass(GluedogBranches);

@Schema({
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  collection: "guest",
})
export class Guest {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  company: string;

  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;

  @Prop()
  clicking_book_viewing: string;
  @Prop()
  lastbook_viewing_successfullyname: string;
  @Prop()
  business_scenes: string;

  @Prop()
  created_at: Date;
  @Prop()
  updated_at: Date;

  // _id: ObjectId("659e812ad59b931c0c9eb4db"),
  // company: ObjectId("658c0eaf4f133672cbe109e2"),
  // first_name: 'j2',
  // last_name: '',
  // email: 'j2@sinaaaaa.com',
  // phone: '',
  // clicking_book_viewing: 0,
  // book_viewing_successfully: 0,
  // created_at: ISODate("2024-01-10T11:36:10.380Z"),
  // updated_at: ISODate("2024-01-10T11:36:10.380Z"),
  // business_scenes: 'letting'
}

export const GuestInfoSchema = SchemaFactory.createForClass(Guest);
export type GuestInfoSchemaDocument = Guest & Document;
