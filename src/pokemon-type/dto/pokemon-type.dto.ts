import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { IPokemonType } from '../interface/pokemon-type.interface';

@ObjectType()
export class PokemonTypeDto extends CommonDto {
  @Field({ description: 'Name of the pokemon type' })
  name!: string;

  constructor(model?: IPokemonType) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
