import { plainToInstance } from "class-transformer";
import { Controller, Get, Post, Body, Param, Delete, HttpCode } from "@nestjs/common/";
import { FotoService } from "./foto.service";
import { FotoDTO } from "./foto.dto";
import { FotoEntity } from "./foto.entity/foto.entity";


@Controller('fotos')
export class FotoController {
    constructor(
        private readonly FotoService: FotoService
    ) { }

    @Get()
    async findAll() {
        return await this.FotoService.findAll()
    }

    @Get(':fotoId')
    async findOne(@Param('fotoId') fotoId: number) {
        return await this.FotoService.findOne(fotoId)
    }

    @Post()
    async create(@Body() fotoDTO: FotoDTO) {
        const foto: FotoEntity = plainToInstance(FotoEntity, fotoDTO)
        return await this.FotoService.create(foto)
    }

    @Delete(':fotoId')
    @HttpCode(204)
    async delete(@Param('fotoId') fotoId: number) {
        return await this.FotoService.delete(fotoId)
    }
}