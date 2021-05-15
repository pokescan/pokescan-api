import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PokemonMoveDetailService } from '@pokemon-move-detail/service/pokemon-move-detail.service';
import { CreatePokemonMoveDto } from '@pokemon-move/dto/create-pokemon-move.dto';
import { PokemonMoveDto } from '@pokemon-move/dto/pokemon-move.dto';
import { UpdatePokemonMoveDto } from '@pokemon-move/dto/update-pokemon-move.dto';
import { PokemonMoveDocument } from '@pokemon-move/schema/pokemon-move.schema';
import { PokemonMoveService } from '@pokemon-move/service/pokemon-move.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => PokemonMoveDto)
export class PokemonMoveResolver extends BaseResolver(PokemonMoveDto) {
  private readonly LOGGER = new Logger(PokemonMoveResolver.name);

  constructor(
    private readonly pokemonMoveService: PokemonMoveService,
    private readonly pokemonMoveDetailService: PokemonMoveDetailService
  ) {
    super(pokemonMoveService);
  }

  @Mutation(() => PokemonMoveDto)
  async createAbility(
    @Args('pokemonMoveInputDto') pokemonMoveInputDto: CreatePokemonMoveDto
  ): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMoveDocument = await this.pokemonMoveService.create(
        pokemonMoveInputDto
      );
      return new PokemonMoveDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${pokemonMoveInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => PokemonMoveDto, { name: 'pokemonMove' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMoveDocument = await this.pokemonMoveService.find(
        id
      );

      return new PokemonMoveDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemon move by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonMoveDto)
  async updatePokemonMove(
    @Args('id') id: string,
    @Args('updatePokemonMoveDto') updatePokemonMoveDto: UpdatePokemonMoveDto
  ): Promise<UpdatePokemonMoveDto> {
    try {
      const pokemonMove: PokemonMoveDocument = await this.pokemonMoveService.update(
        id,
        updatePokemonMoveDto
      );

      return new PokemonMoveDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemon move with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonMoveDto, { nullable: true })
  async removeAbility(@Args('id') id: string): Promise<void> {
    try {
      await this.pokemonMoveService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemon move with id ${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }
}
