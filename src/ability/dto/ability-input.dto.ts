import { IsNotEmpty, IsString } from 'class-validator';

export class AbilityInputDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
