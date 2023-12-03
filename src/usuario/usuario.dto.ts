import { IsNotEmpty, IsString } from "class-validator";

export class UsuarioDTO {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;
}
