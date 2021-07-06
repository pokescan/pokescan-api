import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CreatePokemonTypeDto } from '@pokemon-type/dto/create-pokemon-type.dto';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { PokemonTypeDocument } from '@pokemon-type/schema/pokemon-type.schema';
import { PokemonTypeService } from '@pokemon-type/service/pokemon-type.service';
import { PokemonDto } from '@pokemon/dto/pokemon.dto';
import { PokemonDocument } from '@pokemon/schema/pokemon.schema';
import { PokemonService } from '@pokemon/service/pokemon/pokemon.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => PokemonTypeDto)
export class PokemonTypeResolver extends BaseResolver(PokemonTypeDto) {
  private readonly LOGGER = new Logger(PokemonTypeResolver.name);

  constructor(
    private readonly pokemonTypeService: PokemonTypeService,
    private pokemonService: PokemonService
  ) {
    super(pokemonTypeService);
  }

  @Mutation(() => PokemonTypeDto)
  async createPokemonType(
    @Args('createPokemonType') createPokemonType: CreatePokemonTypeDto
  ): Promise<PokemonTypeDto> {
    try {
      const pokemonType: PokemonTypeDocument = await this.pokemonTypeService.create(
        createPokemonType
      );
      return new PokemonTypeDto(pokemonType);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createPokemonType.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @ResolveField('pokemons', () => [PokemonDto])
  async pokemons(@Parent() pokemonType: PokemonTypeDto): Promise<PokemonDto[]> {
    try {
      const pokemons: PokemonDocument[] = await this.pokemonService.findByPokemonTypeId(
        pokemonType.id.toString()
      );

      return pokemons.map(pokemon => new PokemonDto(pokemon));
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemons with pokemonType id #${pokemonType.id} because: ${error}`
      );
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
