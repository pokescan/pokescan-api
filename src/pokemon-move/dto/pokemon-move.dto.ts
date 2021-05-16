import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { IPokemonMove } from '../interface/pokemon-move.interface';

@ObjectType()
export class PokemonMoveDto extends CommonDto {
  @Field()
  name: string;

  @Field()
  description: string;

  constructor(model?: IPokemonMove) {
    super(model);

    if (model) {
      this.name = model.name;
      this.description = model.description;
    }
  }
}
