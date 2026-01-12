import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TareaEstado } from "../enums/tareas-estado.enum";
import { TareaPrioridad } from "../enums/tareas-prioridad.enum";


export class CreateTareaDto {

    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion: string;

    @IsOptional()
    @IsEnum(TareaPrioridad)
    prioridad?: TareaPrioridad;

    @IsOptional()
    @IsDateString()
    fecha_finalizacion: Date;

    @IsOptional()
    @IsNumber()
    id_usuario: number;
}