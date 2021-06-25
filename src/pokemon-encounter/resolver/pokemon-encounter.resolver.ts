import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePokemonEncounter } from '@pokemon-encounter/dto/create-pokemon-encounter.dto';
import { PokemonEncounterDto } from '@pokemon-encounter/dto/pokemon-encounter.dto';
import { UpdatePokemonEncounter } from '@pokemon-encounter/dto/update-pokemon-encounter.dto';
import { PokemonEncounterDocument } from '@pokemon-encounter/schema/pokemon-encounter.schema';
import { PokemonEncounterService } from '@pokemon-encounter/service/pokemon-encounter.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => PokemonEncounterDto)
export class PokemonEncounterResolver extends BaseResolver(
  PokemonEncounterDto
) {
  private readonly LOGGER = new Logger(PokemonEncounterResolver.name);
  constructor(
    private readonly pokemonEncounterService: PokemonEncounterService
  ) {
    super(pokemonEncounterService);
  }

  @Mutation(() => PokemonEncounterDto)
  async createPokemonEncounter(
    @Args('createPokemonEncounter')
    createPokemonEncounter: CreatePokemonEncounter
  ): Promise<PokemonEncounterDto> {
    try {
      const pokemonEncounter: PokemonEncounterDocument = await this.pokemonEncounterService.create(
        createPokemonEncounter
      );

      return new PokemonEncounterDto(pokemonEncounter);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createPokemonEncounter.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => PokemonEncounterDto, { name: 'pokemonEncounter' })
  async findOne(@Args('id') id: string): Promise<PokemonEncounterDto> {
    try {
      const pokemonEncounter: PokemonEncounterDocument = await this.pokemonEncounterService.find(
        id
      );

      return new PokemonEncounterDto(pokemonEncounter);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemon encounter by its id #${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonEncounterDto)
  async updatePokemonEncounter(
    @Args('updatePokemonEncounter')
    { id, ...dto }: UpdatePokemonEncounter
  ): Promise<PokemonEncounterDto> {
    try {
      const pokemonEncounter: PokemonEncounterDocument = await this.pokemonEncounterService.update(
        id,
        dto
      );

      return new PokemonEncounterDto(pokemonEncounter);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemon encounter for id #${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonEncounterDto, { nullable: true })
  async removePokemonEncounter(@Args('id') id: string): Promise<void> {
    try {
      await this.pokemonEncounterService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemon encounter with id #${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
