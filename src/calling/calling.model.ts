import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'calling',
})
export class Calling {
  @Prop()
  id: string;
  @Prop()
  company: string;
  @Prop()
  user: string;
  @Prop()
  from_phone_number: string;
  @Prop()
  to_phone_number: string;
  @Prop()
  s3_url: string;
  @Prop()
  summary: string;
  @Prop()
  duration: number;
  @Prop()
  created_at: Date;
  @Prop()
  updated_at: Date;
}

export const CallingSchema = SchemaFactory.createForClass(Calling);
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'calling_message',
})
export class CallingMessage {
  @Prop()
  id: string;
  @Prop()
  company: string;
  @Prop()
  user: string;
  @Prop()
  calling: string;
  @Prop()
  side: number;
  @Prop()
  message: string;
  @Prop()
  created_at: Date;
  @Prop()
  updated_at: Date;
}

export const CallingMessageSchema = SchemaFactory.createForClass(CallingMessage);
