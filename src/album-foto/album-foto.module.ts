import { Module } from '@nestjs/common';
import { AlbumFotoService } from './album-foto.service';

@Module({
  providers: [AlbumFotoService]
})
export class AlbumFotoModule {}
