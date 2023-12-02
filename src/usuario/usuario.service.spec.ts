import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariosList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    usuariosList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.word.words(),
        telefono: faker.lorem.word({ length: 10 }),
        fotos: [],
        red: null,
      })
      usuariosList.push(usuario);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll should return a list of fotos', async () => {
    const fotos: UsuarioEntity[] = await service.findAll()
    expect(fotos).not.toBeNull()
    expect(fotos).toHaveLength(usuariosList.length)
  })

  it('findOne should return a usuario', async () => {
    const storedUsuario: UsuarioEntity = usuariosList[0]
    const usuario: UsuarioEntity = await service.findOne(
      storedUsuario.id
    )
    expect(usuario).not.toBeNull()
    expect(usuario.nombre).toBeDefined()
    expect(usuario.telefono).toBeDefined()
    expect(usuario.fotos).toBeDefined()
    expect(usuario.id).toBeDefined()
    expect(usuario.red).toBeDefined()
  })

  it('findOne should not return a usuario', async () => {
    await expect(() => service.findOne(9999)).rejects.toHaveProperty('message', 'The user with the given id was not found')
  })

  it('createUsuario should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: 1,
      nombre: faker.word.words(),
      telefono: faker.lorem.word({ length: 10 }),
      fotos: [],
      red: null
    }
    const newUsuario: UsuarioEntity = await service.create(usuario);

    expect(newUsuario).not.toBeNull()
    expect(usuario).not.toBeNull()
    expect(usuario.nombre).toBeDefined()
    expect(usuario.telefono).toBeDefined()
    expect(usuario.fotos).toBeDefined()
    expect(usuario.id).toBeDefined()
    expect(usuario.red).toBeDefined()
  })

  it('createUsuario should not return a new usuario', async () => {
    const Redsocial: UsuarioEntity = {
      id: 1,
      nombre: faker.word.words(),
      telefono: faker.lorem.word({ length: 20 }),
      fotos: [],
      red: null
    }

    await expect(() => service.create(Redsocial)).rejects.toHaveProperty('message', 'The phone number must have 10 digits')
  })

});
