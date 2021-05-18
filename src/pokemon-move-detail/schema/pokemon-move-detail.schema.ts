import { GameVersion } from '@game-version/schema/game-version.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Damage } from '@pokemon-move-detail/enum/damage.enum';
import { LearnMethod } from '@pokemon-move-detail/enum/learn-method.enum';
import { PokemonMove } from '@pokemon-move/schema/pokemon-move.schema';
import { PokemonType } from '@pokemon-type/schema/pokemon-type.schema';
import { Document, Types } from 'mongoose';

export type PokemonMoveDetailDocument = PokemonMoveDetail & Document;

@Schema({ timestamps: true, versionKey: false })
export class PokemonMoveDetail {
  @Prop({ required: true, trim: true })
  levelLearnedAt: number;

  @Prop({ type: LearnMethod, required: true, trim: true })
  learnMethod: LearnMethod;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'GameVersion',
    autopopulate: true
  })
  version: GameVersion;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'PokemonMove',
    autopopulate: true
  })
  pokemonMove: PokemonMove;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'PokemonType',
    autopopulate: true
  })
  pokemonType: PokemonType;

  @Prop({ required: true, trim: true })
  accuracy: number;

  @Prop({ required: true, trim: true })
  pp: number;

  @Prop({ required: true, trim: true })
  power: number;

  @Prop({ required: true, trim: true })
  effect: number;

  @Prop({ type: Damage, required: true, trim: true })
  damage: Damage;

  @Prop({ required: true, trim: true })
  contestType: number;

  @Prop({ required: true, trim: true })
  contestCharm: number;

  @Prop({ required: true, trim: true })
  contestLocking: number;
}

export const PokemonMoveDetailSchema = SchemaFactory.createForClass(
  PokemonMoveDetail
);
