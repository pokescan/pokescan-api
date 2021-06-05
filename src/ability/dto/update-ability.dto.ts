import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAbilityDto } from './create-ability.dto';

@InputType()
export class UpdateAbilityDto extends OmitType(CreateAbilityDto, [
  'name'
] as const) {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Id of the ability to update' })
  id: string;
}
