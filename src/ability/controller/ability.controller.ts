import { AbilityDto } from '@ability/dto/ability.dto';
import { CreateAbilityDto } from '@ability/dto/create-ability.dto';
import { UpdateAbilityDto } from '@ability/dto/update-ability.dto';
import { AbilityService } from '@ability/service/ability.service';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  LoggerService,
  Param,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { Response } from 'express';

@Controller('abilities')
export class AbilityController {
  constructor(
    private readonly abilityService: AbilityService,
    private readonly logger: LoggerService
  ) {}

  @Post()
  async create(@Body() createAbilityDto: CreateAbilityDto) {
    try {
      const type = await this.abilityService.create(createAbilityDto);
      return new AbilityDto(type);
    } catch (error) {
      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createAbilityDto.name} already exists`
        );
      }
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const abilities = await this.abilityService.findAll();
      if (!abilities || abilities.length === 0) {
        return res.status(204).send();
      }
      return res.status(200).send(abilities);
    } catch (error) {
      this.logger.error(`FindAll request failed because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abilityService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbilityDto: UpdateAbilityDto) {
    return this.abilityService.update(id, updateAbilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abilityService.delete(id);
  }
}
