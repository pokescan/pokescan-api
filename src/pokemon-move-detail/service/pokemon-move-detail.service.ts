import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonMoveDetailDto } from '@pokemon-move-detail/dto/create-pokemon-move-detail.dto';
import {
  PokemonMoveDetail,
  PokemonMoveDetailDocument
} from '@pokemon-move-detail/schema/pokemon-move-detail.schema';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class PokemonMoveDetailService extends AbstractService<
  PokemonMoveDetailDocument,
  CreatePokemonMoveDetailDto
> {
  constructor(
    @InjectModel(PokemonMoveDetail.name)
    pokemonMoveDetailModel: Model<PokemonMoveDetailDocument>
  ) {
    super(pokemonMoveDetailModel);
  }
}
