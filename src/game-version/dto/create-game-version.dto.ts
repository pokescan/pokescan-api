import { Field, InputType } from '@nestjs/graphql';
import { TranslatableObject } from '@shared/models/translatable';

@InputType()
export class CreateGameVersionDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the game version'
  })
  name: TranslatableObject[];

  @Field({
    description: 'CDN URL of the image'
  })
  imageUrl: string;

  @Field({
    description: 'Id of the generation linked to this game version'
  })
  generation: string;
}
