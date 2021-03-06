import { CreateGenerationDto } from '@generation/dto/create-generation.dto';
import { GenerationDto } from '@generation/dto/generation.dto';
import { GenerationDocument } from '@generation/schema/generation.schema';
import { GenerationService } from '@generation/service/generation.service';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { PokemonDto } from '@pokemon/dto/pokemon.dto';
import { PokemonDocument } from '@pokemon/schema/pokemon.schema';
import { PokemonService } from '@pokemon/service/pokemon/pokemon.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => GenerationDto)
export class GenerationResolver extends BaseResolver(GenerationDto) {
  private readonly LOGGER = new Logger(GenerationResolver.name);

  constructor(
    private readonly generationService: GenerationService,
    private pokemonService: PokemonService
  ) {
    super(generationService);
  }

  @Mutation(() => GenerationDto)
  async createGeneration(
    @Args('createGenerationDto') createGenerationDto: CreateGenerationDto
  ): Promise<GenerationDto> {
    try {
      const generation: GenerationDocument = await this.generationService.create(
        createGenerationDto
      );
      return new GenerationDto(generation);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createGenerationDto.order} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @ResolveField('pokemons', () => [PokemonDto])
  async pokemons(@Parent() generation: GenerationDto): Promise<PokemonDto[]> {
    try {
      const pokemons: PokemonDocument[] = await this.pokemonService.findByQueries(
        {
          firstAppearenceGeneration: generation.id.toString()
        }
      );

      return pokemons.map(pokemon => new PokemonDto(pokemon));
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemons with generation id #${generation.id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Query(() => GenerationDto, { name: 'generation' })
  async findOne(@Args('id') id: string): Promise<GenerationDto> {
    try {
      const generation: GenerationDocument = await this.generationService.find(
        id
      );

      return new GenerationDto(generation);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find generation by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => GenerationDto, { nullable: true })
  async removeGeneration(@Args('id') id: string): Promise<void> {
    try {
      await this.generationService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete generation with id ${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }
}
