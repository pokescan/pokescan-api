import { CreateGameVersionDto } from '@game-version/dto/create-game-version.dto';
import { GameVersionDto } from '@game-version/dto/game-version.dto';
import { UpdateGameVersionDto } from '@game-version/dto/update-game-version.dto';
import { GameVersionDocument } from '@game-version/schema/game-version.schema';
import { GameVersionService } from '@game-version/service/game-version.service';
import { GenerationDocument } from '@generation/schema/generation.schema';
import { GenerationService } from '@generation/service/generation.service';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => GameVersionDto)
export class GameVersionResolver extends BaseResolver(GameVersionDto) {
  private readonly LOGGER: Logger = new Logger(GameVersionResolver.name);

  constructor(
    private readonly gameVersionService: GameVersionService,
    private readonly generationService: GenerationService
  ) {
    super(gameVersionService);
  }

  @Mutation(() => GameVersionDto)
  async createGameVersion(
    @Args('createGameVersion') createGameVersion: CreateGameVersionDto
  ): Promise<GameVersionDto> {
    try {
      const generation: GenerationDocument = await this.generationService.find(
        createGameVersion.generation
      );

      if (null === generation) {
        throw new BadRequestException(
          `Cannot create gameVersion because the given generation with id #${createGameVersion.generation} does not exist`
        );
      }

      const gameVersion: GameVersionDocument = await this.gameVersionService.create(
        createGameVersion
      );

      return new GameVersionDto(gameVersion);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createGameVersion.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => GameVersionDto, { name: 'gameVersion' })
  async findOne(@Args('id') id: string): Promise<GameVersionDto> {
    try {
      const gameVersion: GameVersionDocument = await this.gameVersionService.find(
        id
      );

      return new GameVersionDto(gameVersion);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find gameVersion by its id ${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }

  @Mutation(() => GameVersionDto)
  async updateGameVersion(
    @Args('updateGameVersion') updateGameVersion: UpdateGameVersionDto
  ): Promise<GameVersionDto> {
    const { id, generation } = updateGameVersion;

    try {
      const gameVersionInBase: GameVersionDocument = await this.gameVersionService.find(
        id
      );

      if (null === gameVersionInBase) {
        throw new BadRequestException(
          `Cannot update game version with id ${id} because it does not exist`
        );
      }

      const generationDocument: GenerationDocument = await this.generationService.find(
        generation
      );

      if (null === generationDocument) {
        throw new BadRequestException(
          `Cannot create gameVersion because the given generation with id #${generation} does not exist`
        );
      }

      const gameVersion: GameVersionDocument = await this.gameVersionService.update(
        id,
        updateGameVersion
      );

      return new GameVersionDto(gameVersion);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update game version with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => GameVersionDto, { nullable: true })
  async removeGameVersion(@Args('id') id: string): Promise<void> {
    try {
      await this.gameVersionService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete game version with id ${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }
}
