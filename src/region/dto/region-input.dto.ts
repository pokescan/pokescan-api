import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RegionInputDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @Type(() => String)
  @ArrayNotEmpty()
  locations: string[];

  @IsNotEmpty()
  @IsString()
  generation: string;
}
