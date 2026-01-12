import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TareaEstado } from "../enums/tareas-estado.enum";
import { TareaPrioridad } from "../enums/tareas-prioridad.enum";
import { UsuarioModel } from "src/modules/usuarios/models/usuario.model";


@Entity({name: 'tareas'})
export class TareaModel {
    @PrimaryGeneratedColumn()
    id_tareas: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column({
        type: 'enum',
        enum: TareaEstado,
        default: TareaEstado.PENDIENTE
    })
    estado: TareaEstado;

    @Column({
        type: 'enum',
        enum: TareaPrioridad,
        default: TareaPrioridad.BAJA
    })
    prioridad: TareaPrioridad;

    @Column({
        name: 'fecha_creacion',
        type: 'timestamp',
        nullable: true
    })
    fecha_finalizacion: Date;

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.creadorTareas)
    @JoinColumn({name: 'id_usuario'})
    creadorTareas?: UsuarioModel;

    @Column({ name: 'id_usuario', nullable: true})
    id_usuario: number;

    @OneToMany(() => ComentarioModel, (comentario) => comentario.tarea)
    comentarios: ComentarioModel[]
    
    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

}