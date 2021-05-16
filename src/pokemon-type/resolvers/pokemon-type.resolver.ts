import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PokemonTypeInputDto } from '@pokemon-type/dto/pokemon-type-input.dto';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { PokemonTypeDocument } from '@pokemon-type/schema/pokemon-type.schema';
import { PokemonTypeService } from '@pokemon-type/service/pokemon-type.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => PokemonTypeDto)
export class PokemonTypeResolver extends BaseResolver(PokemonTypeDto) {
  private readonly LOGGER = new Logger(PokemonTypeResolver.name);

  constructor(private readonly pokemonTypeService: PokemonTypeService) {
    super(pokemonTypeService);
  }

  @Mutation(() => PokemonTypeDto)
  async createPokemonType(
    @Args('pokemonTypeInputDto') pokemonTypeInputDto: PokemonTypeInputDto
  ): Promise<PokemonTypeDto> {
    try {
      const pokemonType: PokemonTypeDocument = await this.pokemonTypeService.create(
        pokemonTypeInputDto
      );
      return new PokemonTypeDto(pokemonType);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${pokemonTypeInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => PokemonTypeDto, { name: 'pokemonType' })
  async findOne(@Args('id') id: string): Promise<PokemonTypeDto> {
    try {
      const pokemonType: PokemonTypeDocument = await this.pokemonTypeService.find(
        id
      );

      return new PokemonTypeDto(pokemonType);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemonType by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonTypeDto)
  async updatePokemonType(
    @Args('id') id: string,
    @Args('pokemonTypeInputDto') pokemonTypeInputDto: PokemonTypeInputDto
  ): Promise<PokemonTypeDto> {
    try {
      const pokemonType: PokemonTypeDocument = await this.pokemonTypeService.update(
        id,
        pokemonTypeInputDto
      );

      return new PokemonTypeDto(pokemonType);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemonType with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonTypeDto, { nullable: true })
  async removePokemonType(@Args('id') id: string): Promise<void> {
    try {
      await this.pokemonTypeService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemonType with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
