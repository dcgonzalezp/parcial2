import { Module } from '@nestjs/common';
import { UsuarioFotoService } from './usuario-foto.service';

@Module({
  providers: [UsuarioFotoService]
})
export class UsuarioFotoModule {}
