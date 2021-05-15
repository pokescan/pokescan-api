import { BadRequestException, Logger, Type } from '@nestjs/common';
import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Paginated } from '@shared/functions/paginated';
import { CommonDto } from '@shared/models/common.dto';
import { PaginationArgs } from '@shared/models/pagination-args';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Aggregate, Document } from 'mongoose';

interface CountResult {
  count: number;
}

export function BaseResolver<D extends Type<CommonDto>, M extends Document>(
  classRef: D
): any {
  const name: string = classRef.name.replace('Dto', '');

  @ObjectType(`${name}Paginated`)
  class PaginatedObject extends Paginated(classRef) {}

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(
      private service: AbstractService<M, D>,
      private LOGGER: Logger
    ) {}

    @Query(() => PaginatedObject, { name: `findAll${name}s` })
    async findAll(@Args() args?: PaginationArgs): Promise<PaginatedObject> {
      try {
        const { limit, offset } = args;

        const countResultPromise: Aggregate<CountResult[]> = this.service.aggregate<
          CountResult
        >([
          {
            $count: 'count'
          }
        ]);

        const resultsPromise: Promise<M[]> = this.service.findAll(
          offset,
          limit
        );

        const [countResult, results] = await Promise.all([
          countResultPromise,
          resultsPromise
        ]);

        const [count] = countResult;

        const paginated = new PaginatedObject();

        paginated.metadata = {
          totalCount: count?.count || 0,
          // FIXME:
          hasNextPage: true,
          limit,
          offset
        };

        paginated.items = results.map(result => new paginated.type(result));

        return paginated;
      } catch (error) {
        this.LOGGER.error(`Cannot find all ${name} because: ${error}`);

        throw new BadRequestException(error);
      }
    }
  }
  return BaseResolverHost;
}
