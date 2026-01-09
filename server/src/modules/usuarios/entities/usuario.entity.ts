import { UsuarioEstado } from "../enums/usuario-estado.enum";

export class UsuarioEntity {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    estado: UsuarioEstado;

    constructor(data: Partial<UsuarioEntity>) {
        Object.assign(this, data)
    }
}