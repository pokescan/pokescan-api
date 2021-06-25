import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';
import { IPokemonType } from '../interface/pokemon-type.interface';

@ObjectType()
export class PokemonTypeDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the Pokmeon Type'
  })
  name!: TranslatableObject[];

  constructor(model?: IPokemonType) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
