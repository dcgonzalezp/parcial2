import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { RedsocialEntity } from '../../redsocial/redsocial.entity/redsocial.entity';
import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @OneToMany(() => FotoEntity, (foto) => foto.usuario)
  fotos: FotoEntity[];

  @ManyToOne(() => RedsocialEntity, (red) => red.usuarios)
  red: RedsocialEntity;
}
