import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionariosModule } from './funcionarios/funcionarios.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities:[],
    synchronize: true,
    autoLoadEntities: true
  })], FuncionariosModule, AuthModule,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
