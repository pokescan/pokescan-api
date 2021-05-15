import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  class Metadata {
    @Field(() => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    offset: number;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => Metadata)
    metadata: Metadata;

    get typeName(): string {
      return classRef.name;
    }

    get type(): Type<T> {
      return classRef;
    }
  }

  return PaginatedType;
}

export { Paginated };
