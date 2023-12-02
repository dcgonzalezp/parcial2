import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotoList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    fotoList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        ISO: faker.number.int({ min: 100, max: 6400 }),
        velObturacion: faker.number.int({ min: 2, max: 250 }),
        apertura: faker.number.int({ min: 1, max: 10 }),
        fecha: faker.date.past(),
      })
      fotoList.push(foto);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll should return a list of fotos', async () => {
    const fotos: FotoEntity[] = await service.findAll()
    expect(fotos).not.toBeNull()
    expect(fotos).toHaveLength(fotoList.length)
  })

  it('findOne should return a foto', async () => {
    const storedFotos: FotoEntity = fotoList[0]
    const foto: FotoEntity = await service.findOne(
      storedFotos.id
    )
    expect(foto).not.toBeNull();
    expect(foto.ISO).toBeDefined()
    expect(foto.velObturacion).toBeDefined()
    expect(foto.apertura).toBeDefined()
    expect(foto.id).toBeDefined()
    expect(foto.album).toBeDefined()
    expect(foto.fecha).toBeDefined()
    expect(foto.usuario).toBeDefined()
  })

  it('findOne should not return a foto', async () => {
    await expect(() => service.findOne(9999)).rejects.toHaveProperty('message', 'The photo with the given id was not found')
  })

  it('createFoto should return a new foto', async () => {
    const foto: FotoEntity = {
      id: 1,
      ISO: faker.number.int({ min: 100, max: 6400 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      apertura: faker.number.int({ min: 1, max: 10 }),
      album: null,
      fecha: faker.date.past(),
      usuario: null
    }
    const newFoto: FotoEntity = await service.create(foto);

    expect(newFoto).not.toBeNull()
    expect(foto).not.toBeNull()
    expect(foto.ISO).toBeDefined()
    expect(foto.velObturacion).toBeDefined()
    expect(foto.apertura).toBeDefined()
    expect(foto.id).toBeDefined()
    expect(foto.album).toBeDefined()
    expect(foto.fecha).toBeDefined()
    expect(foto.usuario).toBeDefined()
  })

  it('createFoto should not return a new Foto', async () => {
    const foto: FotoEntity = {
      id: 1,
      ISO: faker.number.int({ min: 4000, max: 6400 }),
      velObturacion: faker.number.int({ min: 200, max: 250 }),
      apertura: faker.number.int({ min: 20, max: 32 }),
      album: null,
      fecha: faker.date.past(),
      usuario: null
    }

    await expect(() => service.create(foto)).rejects.toHaveProperty('message', 'Max 2 of those values must be above of the media of its bounds.')
  })

  it('deleteFoto should remove a foto', async () => {
    const foto: FotoEntity = fotoList[0];
    await service.delete(foto.id)
    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: foto.id }
    })
    expect(storedFoto).toBeNull()
  })

  it('deleteFoto should not remove a foto', async () => {
    await expect(() => service.delete(9999)).rejects.toHaveProperty('message', 'The photo with the given id was not found')
  })
});
