import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: Type<T>): any {
  const name: string = classRef.name.replace('Dto', '');

  // FIXME:
  // We have today as much Metadata object in our schema.gql,
  // that we have classes that extends our BaseResolver function
  // that implements the pagination for all of our resolvers.
  @ObjectType(`${name}Metadata`)
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

    @Field()
    metadata: Metadata;

    get type(): Type<T> {
      return classRef;
    }
  }

  return PaginatedType;
}
