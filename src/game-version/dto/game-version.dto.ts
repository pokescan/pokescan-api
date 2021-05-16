import { GenerationDto } from '@generation/dto/generation.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
export class GameVersionDto extends CommonDto {
  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field()
  generation: GenerationDto;
}
