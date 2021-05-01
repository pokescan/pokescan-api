import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonMoveDetailInputDto } from '@pokemon-move-detail/dto/pokemon-move-detail-input.dto';
import {
  PokemonMoveDetail,
  PokemonMoveDetailDocument
} from '@pokemon-move-detail/schema/pokemon-move-detail.schema';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class PokemonMoveDetailService extends AbstractService<
  PokemonMoveDetailDocument,
  PokemonMoveDetailInputDto
> {
  constructor(
    @InjectModel(PokemonMoveDetail.name)
    pokemonMoveDetailModel: Model<PokemonMoveDetailDocument>
  ) {
    super(pokemonMoveDetailModel);
  }
}
