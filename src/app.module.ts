import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CoffeesModule } from './coffees/coffees.module';
import * as process from 'node:process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from './common/scalars/date.scalar';
import { Tea } from './teas/entities/tea.entity';
import { DrinksResolver } from './drinks/drinks.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'timestamp',
        orphanedTypes: [Tea],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar, DrinksResolver],
})
export class AppModule {}
