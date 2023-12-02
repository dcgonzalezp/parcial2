import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    if (usuario.telefono.length != 10)
      throw new BusinessLogicException(
        'The phone number must have 10 digits',
        BusinessError.PRECONDITION_FAILED,
      );
    return await this.usuarioRepository.save(usuario);
  }

  async findOne(id: number): Promise<UsuarioEntity> {
    console.log('Provided ID:', id);

    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['fotos', 'red'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'The user with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return usuario;
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.find({
      relations: ['fotos', 'red'],
    });
  }
}
