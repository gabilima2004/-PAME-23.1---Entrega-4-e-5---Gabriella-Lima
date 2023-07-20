import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { LocalStrategy } from './local.strategy';
import { AdminGuard } from './guards/roles.guard';

@Module({
  imports: [
    FuncionariosModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,  LocalStrategy, JwtStrategy, AdminGuard],
  exports: [AuthService],
})
export class AuthModule {}

