import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { FotoService } from 'src/foto/foto.service';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';

@Module({
  providers: [AlbumService, FotoService],
  controllers: [AlbumController],
  imports: [TypeOrmModule.forFeature([AlbumEntity]), TypeOrmModule.forFeature([FotoEntity])]
})
export class AlbumModule {}
