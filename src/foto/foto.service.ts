import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Long, Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
  ) {}

  async create(foto: FotoEntity): Promise<FotoEntity> {
    if (foto.ISO < 100 || foto.ISO > 6400)
      throw new BusinessLogicException(
        'ISO value wrong',
        BusinessError.PRECONDITION_FAILED,
      );

    if (foto.velObturacion < 2 || foto.velObturacion > 250)
      throw new BusinessLogicException(
        'VelOBt value wrong',
        BusinessError.PRECONDITION_FAILED,
      );

    if (foto.apertura < 1 || foto.apertura > 32)
      throw new BusinessLogicException(
        'Apertura value wrong',
        BusinessError.PRECONDITION_FAILED,
      );
    return await this.fotoRepository.save(foto);
  }

  async findOne(id: number): Promise<FotoEntity> {
    console.log('Provided ID:', id);

    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
      relations: ['album', 'usuario'],
    });
    if (!foto)
      throw new BusinessLogicException(
        'The photo with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return foto;
  }

  async findAll(): Promise<FotoEntity[]> {
    return await this.fotoRepository.find({
      relations: ['album', 'usuario'],
    });
  }

  async delete(id: number) {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
    });
    if (!foto)
      throw new BusinessLogicException(
        'The photo with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return await this.fotoRepository.remove(foto);
  }
}
