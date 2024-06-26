import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { IDrink } from '../../common/interfaces/drink.interface';
import { CoffeeType } from '../../common/enums/coffee-type.enum';
import { loggerMiddleware } from '../../common/middleware/logger.middleware';

@Entity()
@ObjectType({ description: 'Coffee model', implements: () => IDrink })
export class Coffee implements IDrink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  type: CoffeeType;
}
