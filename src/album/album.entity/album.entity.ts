import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { Column, Entity, JoinTable, Long, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Long;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  titulo: string;

  @OneToMany(() => FotoEntity, (foto) => foto.album)
  fotos: FotoEntity[];
}
