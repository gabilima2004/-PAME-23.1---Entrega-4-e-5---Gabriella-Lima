import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import {FuncionariosService} from '../funcionarios/funcionarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private funcionarioService: FuncionariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      usernameField: 'username',
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;
    try {
      return await this.funcionarioService. findOne(id);
    } catch (err){
      throw new ForbiddenException(err.message);
    }
  }
}
