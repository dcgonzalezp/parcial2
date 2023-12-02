import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RedsocialService } from './redsocial.service';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';

describe('RedsocialService', () => {
  let service: RedsocialService;
  let repository: Repository<RedsocialEntity>;
  let redsocialList: RedsocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedsocialService],
    }).compile();

    service = module.get<RedsocialService>(RedsocialService);
    repository = module.get<Repository<RedsocialEntity>>(getRepositoryToken(RedsocialEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    redsocialList = [];
    for (let i = 0; i < 5; i++) {
      const redsocial: RedsocialEntity = await repository.save({
        nombre: faker.word.words(),
        slogan: faker.word.words(),
        usuarios: []
      })
      redsocialList.push(redsocial);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createRedsocial should return a new Redsocial', async () => {
    const redsocial: RedsocialEntity = {
      id: 1,
      nombre: faker.word.words(),
      slogan: faker.word.words({
        count: 20
      }),
      usuarios: []
    }
    const newRedsocial: RedsocialEntity = await service.create(redsocial);

    expect(newRedsocial).not.toBeNull()
    expect(redsocial).not.toBeNull()
    expect(redsocial.nombre).toBeDefined()
    expect(redsocial.slogan).toBeDefined()
    expect(redsocial.usuarios).toBeDefined()
    expect(redsocial.id).toBeDefined()
  })

  it('createRedsocial should not return a new Redsocial', async () => {
    const Redsocial: RedsocialEntity = {
      id: 1,
      nombre: faker.word.words(),
      slogan: '',
      usuarios: []
    }

    await expect(() => service.create(Redsocial)).rejects.toHaveProperty('message', 'The slogan must have at least 20 characters')
  })

});
