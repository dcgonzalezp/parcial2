import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { FotoEntity } from '../foto/foto.entity/foto.entity';
import { FotoService } from '../foto/foto.service';

describe('AlbumService', () => {
  let service: AlbumService;
  let fotoService: FotoService;
  let repository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>
  let AlbumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService, FotoService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    fotoService = module.get<FotoService>(FotoService)
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    AlbumList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        fechaFin: faker.date.future(),
        fechaInicio: faker.date.past(),
        fotos: [],
        titulo: faker.word.words()
      })
      AlbumList.push(album);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findOne should return a album', async () => {
    const storedAlbums: AlbumEntity = AlbumList[0]
    const album: AlbumEntity = await service.findOne(
      storedAlbums.id
    )
    expect(album).not.toBeNull();
    expect(album.fechaFin).toBeDefined()
    expect(album.fechaInicio).toBeDefined()
    expect(album.fotos).toBeDefined()
    expect(album.id).toBeDefined()
    expect(album.titulo).toBeDefined()
  })

  it('findOne should not return a album', async () => {
    await expect(() => service.findOne(9999)).rejects.toHaveProperty('message', 'The album with the given id was not found')
  })

  it('createAlbum should return a new Album', async () => {
    const album: AlbumEntity = {
      id: 1,
      fechaFin: faker.date.future(),
      fechaInicio: faker.date.past(),
      fotos: [],
      titulo: faker.word.words()
    }
    const newAlbum: AlbumEntity = await service.create(album);

    expect(newAlbum).not.toBeNull()
    expect(album).not.toBeNull()
    expect(album.fechaFin).toBeDefined()
    expect(album.fechaInicio).toBeDefined()
    expect(album.fotos).toBeDefined()
    expect(album.id).toBeDefined()
    expect(album.titulo).toBeDefined()
  })

  it('createAlbum should not return a new Album', async () => {
    const Album: AlbumEntity = {
      id: 1,
      fechaFin: faker.date.future(),
      fechaInicio: faker.date.past(),
      fotos: [],
      titulo: ''
    }

    await expect(() => service.create(Album)).rejects.toHaveProperty('message', 'The album name and date are required')
  })

  it('deleteAlbum should remove a Album', async () => {
    const Album: AlbumEntity = AlbumList[0];
    await service.delete(Album.id)
    const storedAlbum: AlbumEntity = await repository.findOne({
      where: { id: Album.id }
    })
    expect(storedAlbum).toBeNull()
  })

  it('deleteAlbum should not remove a Album', async () => {
    await expect(() => service.delete(9999)).rejects.toHaveProperty('message', 'The album with the given id was not found')
  })

  it('addPhotoToAlbum should associate a foto to an album', async () => {
    const album: AlbumEntity = await service.create({
      id: 1,
      fechaFin: new Date(Date.now() + 200000),
      fechaInicio: new Date(Date.now() - 200000),
      fotos: [],
      titulo: faker.word.words()
    })

    const newFoto: FotoEntity = await fotoService.create({
      id: 1,
      ISO: faker.number.int({ min: 100, max: 6400 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      apertura: faker.number.int({ min: 1, max: 10 }),
      album: null,
      fecha: new Date(Date.now()),
      usuario: null
    })

    const result: AlbumEntity = await service.addPhotoToAlbum(
      album.id,
      newFoto.id
    )
    expect(result.fotos.length).toBe(1);
  })

  it('addPhotoToAlbum should not associate a foto to an album', async () => {
    const album: AlbumEntity = await service.create({
      id: 1,
      fechaFin: new Date(Date.now() + 20000000),
      fechaInicio: new Date(Date.now() - 20000000),
      fotos: [],
      titulo: faker.word.words()
    })

    const newFoto: FotoEntity = await fotoService.create({
      id: 1,
      ISO: faker.number.int({ min: 100, max: 6400 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      apertura: faker.number.int({ min: 1, max: 10 }),
      album: null,
      fecha: new Date(Date.now() + 300000000000),
      usuario: null
    })

    await expect(() => service.addPhotoToAlbum(album.id, newFoto.id)).rejects.toHaveProperty('message', 'The date must be in range')
  })

});
