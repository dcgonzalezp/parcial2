import { plainToInstance } from "class-transformer";
import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common/";
import { RedsocialService } from "./redsocial.service";
import { RedsocialDTO } from "./redsocial.dto";
import { RedsocialEntity } from "./redsocial.entity/redsocial.entity";


@Controller('red-social')
export class RedsocialController {
    constructor(
        private readonly RedsocialService: RedsocialService
    ) { }

    @Post()
    async create(@Body() redsocialDTO: RedsocialDTO) {
        const redsocial: RedsocialEntity = plainToInstance(RedsocialEntity, redsocialDTO)
        return await this.RedsocialService.create(redsocial)
    }
}