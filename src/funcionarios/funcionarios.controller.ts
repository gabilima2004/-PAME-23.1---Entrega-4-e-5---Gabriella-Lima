import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  //http://localhost:3000/funcionario
  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.create(createFuncionarioDto);
  }

  //http://localhost:3000/funcionario
  @Get()
  findAll() {
    return this.funcionariosService.findAll();
  }

  //http://localhost:3000/funcionario/{id}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionariosService.findOne(+id);
  }

  //http://localhost:3000/funcionario/{id}
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionariosService.update(+id, updateFuncionarioDto);
  }

  //http://localhost:3000/funcionario/{id}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(+id);
  }
}
