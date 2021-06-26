import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TranslatableObject } from '@shared/models/translatable';
import { Document } from 'mongoose';

export type PokemonMoveDocument = PokemonMove & Document;

@Schema({ timestamps: true, versionKey: false })
export class PokemonMove {
  @Prop({ required: true, trim: true, unique: true })
  name: TranslatableObject[];

  @Prop({ required: true, trim: true })
  description: TranslatableObject[];
}

export const PokemonMoveSchema = SchemaFactory.createForClass(PokemonMove);
