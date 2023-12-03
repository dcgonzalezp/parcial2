import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { FotoEntity } from '../foto/foto.entity/foto.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Long, Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,

    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
  ) { }

  async create(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.titulo)
      throw new BusinessLogicException(
        'The album name and date are required',
        BusinessError.PRECONDITION_FAILED,
      );
    return await this.albumRepository.save(album);
  }

  async findOne(id: number): Promise<AlbumEntity> {
    console.log('Provided ID:', id);

    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
      relations: ['fotos'],
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return album;
  }

  async delete(id: number) {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return await this.albumRepository.remove(album);
  }

  async addPhotoToAlbum(albumId: number, fotoId: number): Promise<AlbumEntity> {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id: fotoId },
    });
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['fotos'],
    });

    if (!foto)
      throw new BusinessLogicException(
        'The foto with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (
      new Date(foto.fecha) < new Date(album.fechaInicio)
      ||
      new Date(foto.fecha) > new Date(album.fechaFin)
    ) {
      throw new BusinessLogicException(
        'The date must be in range',
        BusinessError.NOT_FOUND,
      );
    }

    album.fotos = [...album.fotos, foto];
    return await this.albumRepository.save(album);
  }
}
