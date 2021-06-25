import { IGameVersion } from '@game-version/interface/game-version.interface';
import { GenerationDto } from '@generation/dto/generation.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';

@ObjectType()
export class GameVersionDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the game version'
  })
  name: TranslatableObject[];

  @Field()
  imageUrl: string;

  @Field()
  generation: GenerationDto;

  constructor(model?: IGameVersion) {
    super(model);

    if (model) {
      this.name = model.name;
      this.imageUrl = model.imageUrl;
      this.generation = model.generation;
    }
  }
}
