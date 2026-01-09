import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEstado } from "../enums/usuario-estado.enum";

@Entity()
export class UsuarioModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UsuarioEstado,
        default: UsuarioEstado.ACTIVO
    })
    estado: UsuarioEstado;
}
