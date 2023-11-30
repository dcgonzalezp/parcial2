import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { RedsocialEntity } from 'src/redsocial/redsocial.entity/redsocial.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AlbumEntity, FotoEntity, RedsocialEntity, UsuarioEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    AlbumEntity,
    FotoEntity,
    RedsocialEntity,
    UsuarioEntity,
  ]),
];
