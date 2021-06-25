import { Ability } from '@ability/schema/ability.schema';
import { Generation } from '@generation/schema/generation.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PokemonMove } from '@pokemon-move/schema/pokemon-move.schema';
import { PokemonStat } from '@pokemon-stat/schema/pokemon-stat.schema';
import { PokemonType } from '@pokemon-type/schema/pokemon-type.schema';
import { IPokemonGenderRepartition } from '@pokemon/interface/pokemon.interface';
import { Document, Types } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema({ timestamps: true, versionKey: false })
export class Pokemon {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

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
  abilites: Ability[];

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: PokemonType.name,
    autopopulate: true
  })
  pokemonTypes: PokemonType[];

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: PokemonStat.name,
    autopopulate: true
  })
  pokemonStats: PokemonStat[];

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: PokemonMove.name,
    autopopulate: true
  })
  pokemonMoves: PokemonMove[];

  @Prop({ required: true, trim: true })
  cycle: string;

  @Prop({ required: true, trim: true })
  step: string;

  @Prop({ required: true, trim: true })
  captureRate: number;

  @Prop({ required: true, trim: true })
  firstAppearenceGeneration: number;

  @Prop({ required: true, trim: true })
  eggsGroup: number[];

  @Prop({ required: true, trim: true })
  genderRepartition: IPokemonGenderRepartition;

  @Prop({ required: true, trim: true })
  specy: string;

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
