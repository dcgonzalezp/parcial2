import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialUsuarioService } from './redsocial-usuario.service';

describe('RedsocialUsuarioService', () => {
  let service: RedsocialUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedsocialUsuarioService],
    }).compile();

    service = module.get<RedsocialUsuarioService>(RedsocialUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
