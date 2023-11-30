import { Module } from '@nestjs/common';
import { RedsocialUsuarioService } from './redsocial-usuario.service';

@Module({
  providers: [RedsocialUsuarioService]
})
export class RedsocialUsuarioModule {}
