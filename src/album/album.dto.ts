import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class AlbumDTO {
    @IsNotEmpty()
    @IsDateString()
    fechaInicio: Date;

    @IsNotEmpty()
    @IsDateString()
    fechaFin: Date;

    @IsNotEmpty()
    @IsString()
    titulo: string;
}