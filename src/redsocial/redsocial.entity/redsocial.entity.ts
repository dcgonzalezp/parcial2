import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedsocialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nombre: string;

  @Column()
  slogan: string;

  @OneToMany(() => UsuarioEntity, (usu) => usu.red)
  usuarios: UsuarioEntity[];
}
