import { UsuarioEstado } from "../enums/usuario-estado.enum";

export class UsuarioResponseDto {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    estado: UsuarioEstado;
}