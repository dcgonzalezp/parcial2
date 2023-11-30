import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioFotoService } from './usuario-foto.service';

describe('UsuarioFotoService', () => {
  let service: UsuarioFotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioFotoService],
    }).compile();

    service = module.get<UsuarioFotoService>(UsuarioFotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
