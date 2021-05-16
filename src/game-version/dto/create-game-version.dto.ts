import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameVersionDto {
  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field()
  generation: string;
}
