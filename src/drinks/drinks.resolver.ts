import { Query, Resolver } from '@nestjs/graphql';
import { Tea } from '../teas/entities/tea.entity';
import { Coffee } from '../coffees/entities/coffee.entity';
import { IDrink } from '../common/interfaces/drink.interface';

@Resolver()
export class DrinksResolver {
  @Query(() => [IDrink], { name: 'drinks' })
  async findAll(): Promise<IDrink[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';
    const tea = new Tea();
    tea.name = 'Lipton';
    return [coffee, tea];
  }
}
