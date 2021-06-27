import { Ability } from '@ability/schema/ability.schema';
import { EggGroup } from '@egg-group/schema/egg-group.schema';
import { Generation } from '@generation/schema/generation.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PokemonMove } from '@pokemon-move/schema/pokemon-move.schema';
import { PokemonType } from '@pokemon-type/schema/pokemon-type.schema';
import { PokemonGenderRepartitionObject } from '@pokemon/models/pokemon-gender-repartition';
import { PokemonStatObject } from '@pokemon/models/pokemon-stat';
import { TranslatableObject } from '@shared/models/translatable';
import { Document, Types } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema({ timestamps: true, versionKey: false })
export class Pokemon {
  @Prop({ required: true, trim: true, unique: true })
  name: TranslatableObject[];

  @Prop({ required: true, trim: true, unique: true })
  pokedexId: string;

  @Prop({ required: true, trim: true })
  weight: number;

  @Prop({ required: true, trim: true })
  height: number;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: Ability.name,
    autopopulate: true
  })
  abilities: Ability[];

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: PokemonType.name,
    autopopulate: true
  })
  pokemonTypes: PokemonType[];

  @Prop({ required: true, trim: true, unique: true })
  pokemonStats: PokemonStatObject[];

  @Prop({ required: true, trim: true, unique: true })
  description: TranslatableObject[];

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: PokemonMove.name,
    autopopulate: true
  })
  pokemonMoves: PokemonMove[];

  @Prop({ required: true, trim: true })
  cycle: number;

  @Prop({ required: true, trim: true })
  step: number;

  @Prop({ required: true, trim: true })
  captureRate: number;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Generation.name,
    autopopulate: true
  })
  firstAppearenceGeneration: Generation;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: EggGroup.name,
    autopopulate: true
  })
  eggsGroup: EggGroup[];

  @Prop({ required: true, trim: true })
  genderRepartition: PokemonGenderRepartitionObject;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Generation.name,
    autopopulate: true
  })
  generation: Generation;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Pokemon.name,
    autopopulate: true
  })
  previousPokemon: Pokemon;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Pokemon.name,
    autopopulate: true
  })
  nextPokemon: Pokemon;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
