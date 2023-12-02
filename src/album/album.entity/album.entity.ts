import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { Column, Entity, JoinTable, Long, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  titulo: string;

  @OneToMany(() => FotoEntity, (foto) => foto.album)
  fotos: FotoEntity[];
}
