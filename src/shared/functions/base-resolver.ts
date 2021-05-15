/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BadRequestException, Logger, Type } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '@shared/models/pagination-args';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Aggregate, Document } from 'mongoose';

interface CountResult {
  count: number;
}

// FIXME Type => any
export function BaseResolver<D extends Type<any>, M extends Document>(
  classRef: D
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(
      private service: AbstractService<M, D>,
      private LOGGER: Logger
    ) {}

    @Query(() => classRef, { name: `findAll${classRef.name}` })
    async findAll(@Args() args?: PaginationArgs): Promise<D> {
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

        const paginated = new classRef();

        paginated.metadata = {
          totalCount: count.count,
          // FIXME
          hasNextPage: true,
          limit,
          offset
        };

        paginated.items = results.map(result => new paginated.type(result));

        return paginated;
      } catch (error) {
        this.LOGGER.error(`Cannot find all ${classRef.name} because: ${error}`);

        throw new BadRequestException(error);
      }
    }
  }
  return BaseResolverHost;
}
