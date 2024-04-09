import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Flavor } from '../../entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../../entities/coffee.entity';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {
    super((keys: Array<number>) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(coffeeIds: Array<number>): Promise<Flavor[][]> {
    const coffeesWithFlavors = await this.coffeeRepository.find({
      select: ['id'],
      relations: {
        flavors: true,
      },
      where: {
        id: In(coffeeIds as Array<number>),
      },
    });
    return coffeesWithFlavors.map((c) => c.flavors);
  }
}
