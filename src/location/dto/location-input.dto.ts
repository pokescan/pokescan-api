import { IsNotEmpty, IsString } from 'class-validator';

export class LocationInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
