import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingrediente } from './entities/ingrediente.entity';

@Injectable()
export class IngredientesService {
  constructor(@InjectRepository(Ingrediente) private IngredienteRepository:Repository<Ingrediente>){}

  //Criar um novo Ingrediente
  async create(createIngredienteDto: CreateIngredienteDto) {
    const { name } = createIngredienteDto;

    const IngredienteAlreadyExists = await this.IngredienteRepository.findOne({
      where: { name },
    });

    //Verificando se um ingrediente já existe
    if (IngredienteAlreadyExists) {
      throw new HttpException(
        'Ingredient already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newIngrediente = this.IngredienteRepository.create({
      ...createIngredienteDto,
      createdAt: new Date(),
    });

    await this.IngredienteRepository.save(newIngrediente);

    return newIngrediente;
  }

  //Mostrar todos os Ingredientes
  findAll() {
    return this.IngredienteRepository.find();
  }

  //Mostrar um Ingrediente de acordo com id
  findOne(id: number) {
    return this.IngredienteRepository.findOneBy({id});
  }

  //Atualizar os dados de um Ingrediente
  update(id: number, updateIngredienteDto: UpdateIngredienteDto) {
    this.IngredienteRepository.update({id}, {...updateIngredienteDto})
  }

  //Remover um Ingrediente
  remove(id: number) {
    this.IngredienteRepository.delete({id});
  }
}

