import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Produto } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientesModule } from 'src/ingredientes/ingredientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), IngredientesModule],
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
