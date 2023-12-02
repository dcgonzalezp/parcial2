import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RedsocialService {
  constructor(
    @InjectRepository(RedsocialEntity)
    private readonly redRepository: Repository<RedsocialEntity>,
  ) {}

  async create(red: RedsocialEntity): Promise<RedsocialEntity> {
    if (!red.slogan || red.slogan.length < 20)
      throw new BusinessLogicException(
        'The slogan must have at least 20 characters',
        BusinessError.PRECONDITION_FAILED,
      );
    return await this.redRepository.save(red);
  }
}
