import { AbilityInputDto } from '@ability/dto/ability-input.dto';
import { AbilityDto } from '@ability/dto/ability.dto';
import { Ability } from '@ability/schema/ability.schema';
import { AbilityService } from '@ability/service/ability.service';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { Response } from 'express';

@Controller('abilities')
export class AbilityController {
  private readonly LOGGER = new Logger(AbilityController.name);

  constructor(private readonly abilityService: AbilityService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() abilityInputDto: AbilityInputDto): Promise<AbilityDto> {
    try {
      const ability: Ability = await this.abilityService.create(
        abilityInputDto
      );
      return new AbilityDto(ability);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${abilityInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<AbilityDto>> {
    try {
      const abilities = await this.abilityService.findAll();

      if (!abilities || abilities.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).send(abilities);
    } catch (error) {
      this.LOGGER.error(`Cannot find all abilities because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AbilityDto> {
    try {
      const ability: Ability = await this.abilityService.find(id);

      return new AbilityDto(ability);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find ability by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  async update(
    @Param('id') id: string,
    @Body() abilityInputDto: AbilityInputDto
  ): Promise<AbilityDto> {
    try {
      const ability: Ability = await this.abilityService.update(
        id,
        abilityInputDto
      );

      return new AbilityDto(ability);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update ability with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.abilityService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete ability with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
