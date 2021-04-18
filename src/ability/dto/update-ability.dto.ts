import { PartialType } from '@nestjs/mapped-types';
import { AbilityDto } from './ability.dto';

export class UpdateAbilityDto extends PartialType(AbilityDto) {}
