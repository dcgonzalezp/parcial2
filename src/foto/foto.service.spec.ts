import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotolist: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    albumlist = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repository.save({
            nombre: faker.lorem.word(),
            fecha: faker.date.past(),
            caratula: faker.lorem.word(),
            descripcion: faker.lorem.word()})
        albumlist.push(album);
    }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
