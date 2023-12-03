import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
  imports: [TypeOrmModule.forFeature([UsuarioEntity])]
})
export class UsuarioModule {}
