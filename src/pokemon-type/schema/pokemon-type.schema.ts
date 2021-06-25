import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITranslatableObject } from '@shared/interfaces/translatable-object.interface';
import { Document } from 'mongoose';

export type PokemonTypeDocument = PokemonType & Document;

@Schema({ timestamps: true, versionKey: false })
export class PokemonType {
  @Prop({ required: true, trim: true, unique: true })
  name: ITranslatableObject[];
}

export const PokemonTypeSchema = SchemaFactory.createForClass(PokemonType);
