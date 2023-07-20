import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { AuthModule } from './auth/auth.module';
import { ProdutosModule } from './produtos/produtos.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { Produto } from './produtos/entities/produto.entity';
import { Ingrediente } from './ingredientes/entities/ingrediente.entity';
import { Funcionario } from './funcionarios/entities/funcionario.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities:[Funcionario, Produto, Ingrediente],
    synchronize: true,
    autoLoadEntities: true
    }),FuncionariosModule, AuthModule, ProdutosModule, IngredientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
