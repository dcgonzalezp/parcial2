import { plainToInstance } from "class-transformer";
import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common/";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity/usuario.entity";
import { UsuarioDTO } from "./usuario.dto";


@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly UsuarioService: UsuarioService
    ) { }

    @Get()
    async findAll() {
        return await this.UsuarioService.findAll()
    }

    @Get(':usuarioId')
    async findOne(@Param('usuarioId') usuarioId: number) {
        return await this.UsuarioService.findOne(usuarioId)
    }

    @Post()
    async create(@Body() usuarioDTO: UsuarioDTO) {
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDTO)
        return await this.UsuarioService.create(usuario)
    }
    
}