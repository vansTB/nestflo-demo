import {
  Field,
  InputType,
  Int,
  ObjectType,
} from "@nestjs/graphql";
@ObjectType({ description: "CallingEntity" })
export class CallingEntity {
  @Field(() => String)
  from_phone_number: string;
  @Field(() => String)
  to_phone_number: string;
  @Field(() => String)
  s3_url: string;
  @Field(() => String)
  summary: string;
  @Field(() => Int)
  duration: number;
}
@InputType({ description: 'query calling input' })
export class QueryCallingInput {
  @Field()
  to_phone_number: string;
}