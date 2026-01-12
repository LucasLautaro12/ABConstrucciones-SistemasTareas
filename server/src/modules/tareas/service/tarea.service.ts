import { InjectRepository } from "@nestjs/typeorm";
import { TareaModel } from "../models/tarea.model";
import { Repository } from "typeorm";
import { CreateTareaDto } from "../dtos/create-tarea.dto";
import { UsuarioModel } from "src/modules/usuarios/models/usuario.model";
import { NotFoundException } from "@nestjs/common";
import { UpdateTareaDto } from "../dtos/update-tarea.dto";

export class TareaService {
    constructor() {
        @InjectRepository(TareaModel)
        private readonly tareaRepository: Repository<TareaModel>

        @InjectRepository(UsuarioModel)
        private readonly usuarioRepository: Repository<UsuarioModel>
    }

    async create(createTareaDto: CreateTareaDto): Promise<TareaModel> {
        let usuario_asignado: UsuarioModel | null = null;

        if (createTareaDto.id_usuario) {
            usuario_asignado = await this.usuarioRepository.findOneBy({ where: { id_usuario: createTareaDto.id_usuario } })
            if (!usuario_asignado) {
                throw new NotFoundException('Usuario asignado no encontrado');
            }
        }

        const tarea = this.tareaRepository.create({
            titulo: createTareaDto.titulo,
            descripcion: createTareaDto.descripcion,
            prioridad: createTareaDto.prioridad,
            fecha_finalizacion: createTareaDto.fecha_finalizacion ? new Date(createTareaDto.fecha_finalizacion) : null,
            creadorTareas: usuario_asignado,
            id_usuario: usuario_asignado?.id_usuario
        })

        return this.tareaRepository.save(tarea)
    }

    async findAll(): Promise<TareaModel[]>{
        return this.tareaRepository.find({
            relations: ['creadorTareas', 'id_usuario']
        })
    }

    async findOne(id: number): Promise<TareaModel>{
        const tarea = await this.tareaRepository.findOneBy({ 
            where: { id_tareas: id },
            relations: ['creadorTareas', 'id_usuario']
        })
        if (!tarea) {
            throw new NotFoundException('Tarea no encontrada');
        }
        return tarea
    }

    async update(id: number, updateTareaDto: UpdateTareaDto): Promise<TareaModel>{
        const tarea = await this.findOne(id)

        if(updateTareaDto.id_usuario){
            const usuario_asignado = await this.usuarioRepository.findOneBy({ where: { id_usuario: updateTareaDto.id_usuario } })
            if (!usuario_asignado) {
                throw new NotFoundException('Usuario asignado no encontrado');
            }
            tarea.creadorTareas = usuario_asignado
            tarea.id_usuario = usuario_asignado.id_usuario
        }

        Object.assign(tarea, {
            titulo: updateTareaDto.titulo ?? tarea.titulo,
            descripcion: updateTareaDto.descripcion ?? tarea.descripcion,
            estado: updateTareaDto.estado ?? tarea.estado,
            prioridad: updateTareaDto.prioridad ?? tarea.prioridad,
            fecha_finalizacion: updateTareaDto.fecha_finalizacion ? new Date(updateTareaDto.fecha_finalizacion) : null,
        })
        return this.tareaRepository.save(tarea)
    }
}
