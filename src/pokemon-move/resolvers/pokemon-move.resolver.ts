import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CreatePokemonMoveDetailDto } from '@pokemon-move-detail/dto/create-pokemon-move-detail.dto';
import { PokemonMoveDetailDto } from '@pokemon-move-detail/dto/pokemon-move-detail.dto';
import { UpdatePokemonMoveDetailDto } from '@pokemon-move-detail/dto/update-pokemon-move-detail.dto';
import { PokemonMoveDetailDocument } from '@pokemon-move-detail/schema/pokemon-move-detail.schema';
import { PokemonMoveDetailService } from '@pokemon-move-detail/service/pokemon-move-detail.service';
import { CreatePokemonMoveDto } from '@pokemon-move/dto/create-pokemon-move.dto';
import { PokemonMoveDto } from '@pokemon-move/dto/pokemon-move.dto';
import { UpdatePokemonMoveDto } from '@pokemon-move/dto/update-pokemon-move.dto';
import { PokemonMoveDocument } from '@pokemon-move/schema/pokemon-move.schema';
import { PokemonMoveService } from '@pokemon-move/service/pokemon-move.service';
import { PokemonTypeDocument } from '@pokemon-type/schema/pokemon-type.schema';
import { PokemonTypeService } from '@pokemon-type/service/pokemon-type.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => PokemonMoveDto)
export class PokemonMoveResolver extends BaseResolver(PokemonMoveDto) {
  private readonly LOGGER = new Logger(PokemonMoveResolver.name);

  constructor(
    private readonly pokemonMoveService: PokemonMoveService,
    private readonly pokemonMoveDetailService: PokemonMoveDetailService,
    private readonly pokemonTypeService: PokemonTypeService
  ) {
    super(pokemonMoveService);
  }

  @Mutation(() => PokemonMoveDto)
  async createPokemonMove(
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
    return this.findPokemonMoveById(id);
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
  async removePokemonMove(@Args('id') id: string): Promise<void> {
    try {
      await this.pokemonMoveService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemon move with id ${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }

  @ResolveField('pokemonMoveDetails', () => [PokemonMoveDetailDto])
  async pokemonMoveDetails(
    @Parent() { id }: PokemonMoveDto
  ): Promise<PokemonMoveDetailDto[]> {
    try {
      const pokemonMove: PokemonMoveDto = await this.findPokemonMoveById(id);

      if (null == pokemonMove) {
        throw new BadRequestException(
          `Cannot get pokemon move detail for pokemonMove with id #${id} because it does not exist`
        );
      }

      const pokemonMoveDetails: PokemonMoveDetailDocument[] = await this.pokemonMoveDetailService.aggregate(
        [
          {
            $match: { pokemonMove: id }
          }
        ]
      );

      return pokemonMoveDetails.map(pmd => new PokemonMoveDetailDto(pmd));
    } catch (error) {
      this.LOGGER.error(
        `Cannot get all pokemon move detail for pokemonMove with id #${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonMoveDetailDto)
  async createPokemonMoveDetail(
    @Args('pokemonMoveId') pokemonMoveId: string,
    @Args('pokemonMoveDetailDto')
    pokemonMoveDetailDto: CreatePokemonMoveDetailDto
  ): Promise<PokemonMoveDetailDto> {
    try {
      const pokemonMove: PokemonMoveDto = await this.findPokemonMoveById(
        pokemonMoveId
      );

      if (null == pokemonMove) {
        throw new BadRequestException(
          `Cannot create pokemon move detail for pokemonMove with id #${pokemonMoveId} because it does not exist`
        );
      }

      const pokemonType: PokemonTypeDocument = await this.pokemonTypeService.find(
        pokemonMoveDetailDto.pokemonType
      );

      if (null === pokemonType) {
        throw new BadRequestException(
          `Cannot create pokemon type for pokemonMove with id #${pokemonMoveId} because it does not exist`
        );
      }

      const pokemonMoveDetail: PokemonMoveDetailDocument = await this.pokemonMoveDetailService.create(
        {
          ...pokemonMoveDetailDto,
          pokemonMove: pokemonMove.id,
          pokemonType: pokemonType.id
        }
      );

      return new PokemonMoveDetailDto(pokemonMoveDetail);
    } catch (error) {
      this.LOGGER.error(
        `Cannot create pokemon move detail for pokemonMove with id #${pokemonMoveId} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonMoveDetailDto)
  async updatePokemonMoveDetail(
    @Args('pokemonMoveId') pokemonMoveId: string,
    @Args('pokemonMoveDetailId') pokemonMoveDetailId: string,
    @Args('pokemonMoveDetailDto')
    pokemonMoveDetailDto: UpdatePokemonMoveDetailDto
  ): Promise<PokemonMoveDetailDto> {
    try {
      const pokemonMoveDetail: PokemonMoveDetailDocument = await this.pokemonMoveDetailService.find(
        pokemonMoveDetailId
      );

      if (null == pokemonMoveDetail) {
        throw new BadRequestException(
          `Cannot update pokemon move detail with id #${pokemonMoveDetailId} because it does not exist`
        );
      }

      const pokemonMove: PokemonMoveDto = await this.findPokemonMoveById(
        pokemonMoveId
      );

      if (null == pokemonMove) {
        throw new BadRequestException(
          `Cannot create pokemon move detail for pokemonMove with id #${pokemonMoveId} because it does not exist`
        );
      }

      const pokemonType: PokemonTypeDocument = await this.pokemonTypeService.find(
        pokemonMoveDetailDto.pokemonType
      );

      if (null === pokemonType) {
        throw new BadRequestException(
          `Cannot create pokemon move detail for pokemonMove with id #${pokemonMoveId} because the provided pokemon type does not exist`
        );
      }

      const pokemonMoveDetailUpdated: PokemonMoveDetailDocument = await this.pokemonMoveDetailService.update(
        pokemonMoveDetailId,
        {
          ...pokemonMoveDetailDto,
          pokemonMove: pokemonMove.id,
          pokemonType: pokemonType.id
        }
      );

      return new PokemonMoveDetailDto(pokemonMoveDetailUpdated);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemon move detail for pokemonMove with id #${pokemonMoveId} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => PokemonMoveDetailDto, { nullable: true })
  async removePokemonMoveDetail(
    @Args('pokemonMoveDetailId') pokemonMoveDetailId: string
  ): Promise<void> {
    try {
      await this.pokemonMoveDetailService.delete(pokemonMoveDetailId);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemon move detail with id #${pokemonMoveDetailId} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  private async findPokemonMoveById(id: string): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMoveDocument = await this.pokemonMoveService.find(
        id
      );

      return new PokemonMoveDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemonMove by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
