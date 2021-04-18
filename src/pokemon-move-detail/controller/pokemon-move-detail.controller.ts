import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonMoveDetailService } from './pokemon-move-detail.service';
import { CreatePokemonMoveDetailDto } from './dto/create-pokemon-move-detail.dto';
import { UpdatePokemonMoveDetailDto } from './dto/update-pokemon-move-detail.dto';

@Controller('pokemon-move-detail')
export class PokemonMoveDetailController {
  constructor(private readonly pokemonMoveDetailService: PokemonMoveDetailService) {}

  @Post()
  create(@Body() createPokemonMoveDetailDto: CreatePokemonMoveDetailDto) {
    return this.pokemonMoveDetailService.create(createPokemonMoveDetailDto);
  }

  @Get()
  findAll() {
    return this.pokemonMoveDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonMoveDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonMoveDetailDto: UpdatePokemonMoveDetailDto) {
    return this.pokemonMoveDetailService.update(+id, updatePokemonMoveDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonMoveDetailService.remove(+id);
  }
}
