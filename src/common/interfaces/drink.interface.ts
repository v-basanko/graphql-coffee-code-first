import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class IDrink {
  @Field()
  name: string;
}
