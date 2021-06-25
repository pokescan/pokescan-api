import { GameVersion } from '@game-version/schema/game-version.schema';
import { Location } from '@location/schema/location.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Pokemon } from '@pokemon/schema/pokemon.schema';
import { TranslatableObject } from '@shared/models/translatable';
import { Document, Types } from 'mongoose';

export type PokemonEncounterDocument = PokemonEncounter & Document;

@Schema({ timestamps: true, versionKey: false })
export class PokemonEncounter {
  @Prop({ required: true, trim: true, unique: true })
  name: TranslatableObject[];

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: GameVersion.name,
    autopopulate: true
  })
  gameVersion: GameVersion;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Location.name,
    autopopulate: true
  })
  location: Location;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Pokemon.name,
    autopopulate: true
  })
  pokemon: Pokemon;

  @Prop({ required: true, trim: true, unique: true })
  method: string;

  @Prop({ required: true, trim: true, unique: true })
  chance: number;

  @Prop({ required: true, trim: true, unique: true })
  minLevel: number;

  @Prop({ required: true, trim: true, unique: true })
  maxLevel: number;

  @Prop({ required: true, trim: true, unique: true })
  maxChance: number;
}

export const PokemonEncounterSchema = SchemaFactory.createForClass(
  PokemonEncounter
);
