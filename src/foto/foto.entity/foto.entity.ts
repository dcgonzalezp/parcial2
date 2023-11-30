import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Column, Entity, IntegerType, Long, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Long ;

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
