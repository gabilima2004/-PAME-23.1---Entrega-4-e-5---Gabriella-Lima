import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';

@Injectable()
export class ProdutosService {
  constructor(@InjectRepository(Produto) private ProdutoRepository:Repository<Produto>,
              @InjectRepository(Ingrediente) private IngredienteRepository: Repository<Ingrediente>){}

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

  //Adicionar os ingredientes a um produto
  async adicionarIngredientesAoProduto(
    nomeProduto: string,
    nomesIngredientes: string[],
  ): Promise<Produto> {
    const produto = await this.ProdutoRepository.findOne({
      where: { name: nomeProduto },
      relations: ['ingredientes'],
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    const ingredientes = await this.IngredienteRepository
    .createQueryBuilder('ingrediente')
    .where('ingrediente.name IN (:...nomesIngredientes)', { nomesIngredientes })
    .getMany();

    produto.ingredientes = [...produto.ingredientes, ...ingredientes];

    return this.ProdutoRepository.save(produto);
  }

  //Mostrar todos os Produtos
  findAll() {
    return this.ProdutoRepository.find();
  }

  //Mostrar um Produto de acordo com seu id
  findOne(id: number) {
    return this.ProdutoRepository.findOneBy({id});
  }

  //Atualizar os dados de um Produto
  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const updatedProduto = await this.ProdutoRepository.preload({
      id,
      ...updateProdutoDto,
    });

    if (!updatedProduto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.ProdutoRepository.save(updatedProduto);
  }

  //Remover um Produto
  async remove(id: number) {
    const deletedProduto = await this.ProdutoRepository.findOneBy({id});

    if (!deletedProduto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.ProdutoRepository.remove(deletedProduto);
  }
}


