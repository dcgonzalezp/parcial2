import { IsNotEmpty, IsString } from "class-validator";


export class RedsocialDTO {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    slogan: string;
}
