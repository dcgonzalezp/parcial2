import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) { }

  async create(foto: FotoEntity): Promise<FotoEntity> {

    if (foto.ISO > (100 + 6400) / 2 && foto.velObturacion > (2 + 252) / 2 && foto.apertura > (1 + 32) / 2) {
      throw new BusinessLogicException(
        'Max 2 of those values must be above of the media of its bounds.',
        BusinessError.PRECONDITION_FAILED
      );
    }

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
      relations: ['album']
    });
    if (!foto)
      throw new BusinessLogicException(
        'The photo with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (foto.album) {
      const album: AlbumEntity = await this.albumRepository.findOne({
        where: { id: foto.album?.id },
        relations: ['fotos']
      })

      if (album && album.fotos.length === 1 && album.fotos.includes(foto)) {
        await this.albumRepository.remove(album);
      }
    }
    return await this.fotoRepository.remove(foto);
  }
}
