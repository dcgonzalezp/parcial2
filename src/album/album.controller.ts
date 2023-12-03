import { plainToInstance } from "class-transformer";
import { AlbumDTO } from "./album.dto";
import { AlbumEntity } from "./album.entity/album.entity";
import { AlbumService } from "./album.service";
import { Controller, Get, Post, Body, Param, Delete, HttpCode } from "@nestjs/common/";


@Controller('albums')
export class AlbumController {
    constructor(
        private readonly AlbumService: AlbumService
    ) { }

    @Get(':albumId')
    async findOne(@Param('albumId') albumId: number) {
        return await this.AlbumService.findOne(albumId)
    }

    @Post()
    async create(@Body() albumDTO: AlbumDTO) {
        const album: AlbumEntity = plainToInstance(AlbumEntity, albumDTO)
        return await this.AlbumService.create(album)
    }

    @Delete(':albumId')
    @HttpCode(204)
    async delete(@Param('albumId') albumId: number) {
        return await this.AlbumService.delete(albumId)
    }

    @Post(':albumId/fotos/:fotoId')
    async addFotoToAlbum(@Param('albumId') albumId: number, @Param('fotoId') fotoId: number) {
        return await this.AlbumService.addPhotoToAlbum(albumId, fotoId)
    }
}