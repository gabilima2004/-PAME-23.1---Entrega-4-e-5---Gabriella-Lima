import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private funcionariosService: FuncionariosService,
    private jwtService: JwtService,
  ){}

  async validateFuncionario(loginDto: LoginDto): Promise<any>{
    const {username, password} = loginDto;
    const funcionario = await this.funcionariosService.findOneByUsername(username);
    if (!funcionario){
      throw new NotFoundException ("Funcionário with username '"+ username + "' not found");
    }

    const password_is_equal = await bcrypt.compare(
      password,
      funcionario.password,
    );
    
    if (password_is_equal){
      const { password: hashed_password, ...result} = funcionario;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const funcionario = await this.validateFuncionario(loginDto);

    if (!funcionario) {
      // Se a função de validação retornar null, significa que as credenciais são inválidas
      throw new UnauthorizedException('Invalid credentials');
    }

    // Se as credenciais são válidas, geramos o token JWT com os dados do funcionário
    const payload = { sub: funcionario.id, username: funcionario.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //Criando um hash para as senhas
  async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password,salt);
  }
  
}
