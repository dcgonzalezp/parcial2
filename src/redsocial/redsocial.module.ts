import { Module } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { RedsocialController } from './redsocial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';

@Module({
  providers: [RedsocialService],
  controllers: [RedsocialController],
  imports: [TypeOrmModule.forFeature([RedsocialEntity])]
})
export class RedsocialModule {}
