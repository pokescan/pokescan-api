import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@shared/models/paginated';
import { AbilityDto } from './ability.dto';

@ObjectType()
export class PaginatedAbility extends Paginated(AbilityDto) {}
