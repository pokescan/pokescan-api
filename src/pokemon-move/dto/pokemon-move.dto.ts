import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';
import { IPokemonMove } from '../interface/pokemon-move.interface';

@ObjectType()
export class PokemonMoveDto extends CommonDto {
  @Field(() => [TranslatableObject])
  name: TranslatableObject[];

  @Field(() => [TranslatableObject])
  description: TranslatableObject[];

  constructor(model?: IPokemonMove) {
    super(model);

    if (model) {
      this.name = model.name;
      this.description = model.description;
    }
  }
}
