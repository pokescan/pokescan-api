import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePokemonDto } from '@pokemon/dto/create-pokemon.dto';
import { PokemonDto } from '@pokemon/dto/pokemon.dto';
import { UpdatePokemonDto } from '@pokemon/dto/update-pokemon.dto';
import { PokemonDocument } from '@pokemon/schema/pokemon.schema';
import { PokemonService } from '@pokemon/service/pokemon/pokemon.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => PokemonDto)
export class PokemonResolver extends BaseResolver(PokemonDto) {
  private readonly LOGGER = new Logger(PokemonDto.name);

  constructor(private readonly pokemonService: PokemonService) {
    super(pokemonService);
  }

  @Mutation(() => PokemonDto)
  async createPokemon(
    @Args('pokemonInputDto') pokemonInputDto: CreatePokemonDto
  ): Promise<PokemonDto> {
    try {
      const pokemonMove: PokemonDocument = await this.pokemonService.create(
        pokemonInputDto
      );
      return new PokemonDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${PokemonDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => PokemonDto, { name: 'pokemon' })
  async findOne(@Args('id') id: string): Promise<PokemonDto> {
    return this.findPokemonById(id);
  }

  @Mutation(() => PokemonDto)
  async updatePokemon(
    @Args('updatePokemonDto') { id, ...dto }: UpdatePokemonDto
  ): Promise<PokemonDto> {
    try {
      const pokemon: PokemonDocument = await this.pokemonService.update(
        id,
        dto
      );

      return new PokemonDto(pokemon);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemon with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonDto, { nullable: true })
  async removePokemon(@Args('id') id: string): Promise<void> {
    try {
      await this.pokemonService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemon with id ${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }

  private async findPokemonById(id: string): Promise<PokemonDto> {
    try {
      const pokemon: PokemonDocument = await this.pokemonMoveService.find(id);

      return new PokemonDto(pokemon);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemon by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
