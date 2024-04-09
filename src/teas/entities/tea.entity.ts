import { ObjectType } from '@nestjs/graphql';
import { IDrink } from '../../common/interfaces/drink.interface';

@ObjectType({ implements: () => IDrink })
export class Tea implements IDrink {
  name: string;
}
