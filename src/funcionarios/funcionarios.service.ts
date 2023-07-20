import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionariosService {
  constructor(@InjectRepository(Funcionario) private funcionarioRepository:Repository<Funcionario>){}

  //Criar um novo usuário
  async create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const { username , password} = createFuncionarioDto;

    //Verificando se o usuário já existe
    const funcionarioAlreadyExists = await this.funcionarioRepository.findOne({
      where: { username },
    });

    if (funcionarioAlreadyExists) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashed_password = await this.hashPassword(password);
    //delete createFuncionarioDto.password;
    

    const newFuncionario = this.funcionarioRepository.create({
      password: hashed_password,
      ...createFuncionarioDto
    });

    await this.funcionarioRepository.save(newFuncionario);

    return newFuncionario;
  }

  //Mostrar todos os usuários
  findAll() {
    return this.funcionarioRepository.find;
  }

  //Mostrar um usuário de acordo com seu id
  findOne(id: number) {
    return this.funcionarioRepository.findOneBy({id});
  }

  //Procurar um usuário de acordo com o seu username
  async findOneByUsername(username: string): Promise<Funcionario | null> {
    const funcionario = await this.funcionarioRepository.findOne({
      where: { username },
    });

    return funcionario || null;
  }

  //Atualizar os dados de um usuário
  update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    this.funcionarioRepository.update({id}, {...updateFuncionarioDto})
  }

  //Remover um usuário
  remove(id: number) {
    this.funcionarioRepository.delete(id);
  }

  //Criando um hash para as senhas
  async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password,salt);
  }
}
