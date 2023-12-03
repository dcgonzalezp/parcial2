import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoController } from './foto.controller';
import { FotoEntity } from './foto.entity/foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { AlbumEntity } from 'src/album/album.entity/album.entity';

@Module({
  providers: [FotoService, AlbumService],
  controllers: [FotoController],
  imports: [TypeOrmModule.forFeature([FotoEntity]), TypeOrmModule.forFeature([AlbumEntity])]
})
export class FotoModule { }
