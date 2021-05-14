import { BadRequestException, Logger, Type } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { PaginationArgs } from '@shared/models/pagination-args';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Document } from 'mongoose';

export function BaseResolver<D extends Type<CommonDto>, M extends Document>(
  classRef: D
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(
      private service: AbstractService<M, D>,
      private LOGGER: Logger
    ) {}

    @Query(() => [classRef], { name: `findAll${classRef.name}` })
    async findAll(@Args() args?: PaginationArgs): Promise<D[]> {
      try {
        const results: M[] = await this.service.findAll(
          args.offset,
          args.limit
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return results.map(result => new classRef(result));
      } catch (error) {
        this.LOGGER.error(`Cannot find all abilities because: ${error}`);
        throw new BadRequestException(error);
      }
    }
  }
  return BaseResolverHost;
}
