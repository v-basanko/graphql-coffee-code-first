import { Query, Resolver } from '@nestjs/graphql';
import { Tea } from '../teas/entities/tea.entity';
import { Coffee } from '../coffees/entities/coffee.entity';
import { DrinksResultUnion } from '../common/unions/drinks-result.union';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinksResultUnion)[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';
    const tea = new Tea();
    tea.name = 'Lipton';
    return [coffee, tea];
  }
}
