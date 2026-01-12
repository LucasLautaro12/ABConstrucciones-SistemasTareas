import { IsEnum, IsOptional } from "class-validator";
import { TareaPrioridad } from "../enums/tareas-prioridad.enum";
import { CreateTareaDto } from "./create-tarea.dto";
import { PartialType } from "@nestjs/mapped-types";
import { TareaEstado } from "../enums/tareas-estado.enum";



export class UpdateTareaDto extends PartialType(CreateTareaDto) {
    @IsOptional()
    @IsEnum(TareaPrioridad)
    prioridad?: TareaPrioridad;

    @IsOptional()
    @IsEnum(TareaEstado)
    estado?: TareaEstado;
}