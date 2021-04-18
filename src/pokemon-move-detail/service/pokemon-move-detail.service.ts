import { Injectable } from '@nestjs/common';
import { CreatePokemonMoveDetailDto } from './dto/create-pokemon-move-detail.dto';
import { UpdatePokemonMoveDetailDto } from './dto/update-pokemon-move-detail.dto';

@Injectable()
export class PokemonMoveDetailService {
  create(createPokemonMoveDetailDto: CreatePokemonMoveDetailDto) {
    return 'This action adds a new pokemonMoveDetail';
  }

  findAll() {
    return `This action returns all pokemonMoveDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemonMoveDetail`;
  }

  update(id: number, updatePokemonMoveDetailDto: UpdatePokemonMoveDetailDto) {
    return `This action updates a #${id} pokemonMoveDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemonMoveDetail`;
  }
}
