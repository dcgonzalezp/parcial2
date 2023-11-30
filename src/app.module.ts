import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { RedsocialUsuarioModule } from './redsocial-usuario/redsocial-usuario.module';
import { UsuarioFotoModule } from './usuario-foto/usuario-foto.module';
import { AlbumFotoModule } from './album-foto/album-foto.module';

@Module({
  imports: [AlbumModule, FotoModule, UsuarioModule, RedsocialModule, RedsocialUsuarioModule, UsuarioFotoModule, AlbumFotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
