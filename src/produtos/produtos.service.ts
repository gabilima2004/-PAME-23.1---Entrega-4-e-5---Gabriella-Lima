import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(@InjectRepository(Produto) private ProdutoRepository:Repository<Produto>){}

  //Criar um novo Produto
  async create(createProdutoDto: CreateProdutoDto) {
    const { name } = createProdutoDto;

    const ProdutoAlreadyExists = await this.ProdutoRepository.findOne({
      where: { name },
    });

    //Verificando se um Produto já existe
    if (ProdutoAlreadyExists) {
      throw new HttpException(
        'Ingredient already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProduto = this.ProdutoRepository.create({
      ...createProdutoDto,
      createdAt: new Date(),
    });

    await this.ProdutoRepository.save(newProduto);

    return newProduto;
  }

  //Mostrar todos os Produtos
  findAll() {
    return this.ProdutoRepository.find;
  }

  //Mostrar um Produto de acordo com seu id
  findOne(id: number) {
    return this.ProdutoRepository.findOneBy({id});
  }

  //Atualizar os dados de um Produto
  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    this.ProdutoRepository.update({id}, {...updateProdutoDto})
  }

  //Remover um Produto
  remove(id: number) {
    this.ProdutoRepository.delete({id});
  }
}

