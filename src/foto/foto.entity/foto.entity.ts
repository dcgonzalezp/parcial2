import { AlbumEntity } from '../../album/album.entity/album.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { Column, Entity, IntegerType, Long, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  ISO: number;

  @Column()
  velObturacion: number;

  @Column()
  apertura: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => AlbumEntity, (album) => album.fotos)
  album: AlbumEntity;

  @ManyToOne(() => UsuarioEntity, (usu) => usu.fotos)
  usuario: UsuarioEntity;
}
