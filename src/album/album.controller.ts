import { AlbumService } from "./album.service";
import { Controller, Get, Post, Body, Param } from "@nestjs/common/";


@Controller('albums')
export class AlbumController {
    constructor(
        private readonly AlbumService: AlbumService
    ) { }

    @Get(':albumId')
    async findOne(@Param('albumId') albumId: number) {
        return await this.AlbumService.findOne(albumId)
    }
}