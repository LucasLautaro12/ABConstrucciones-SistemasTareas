import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { TareaService } from "../services/tarea.service";
import { CreateTareaDto } from "../dtos/create-tarea.dto";
import { UpdateTareaDto } from "../dtos/update-tarea.dto";

@Controller('tareas')
export class TareaController {
    constructor(private readonly tareaService: TareaService) {}

    @Post()
    create(@Body() createTareaDto: CreateTareaDto) {
        return this.tareaService.create(createTareaDto);
    }

    @Get()
    findAll() {
        return this.tareaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.tareaService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTareaDto: UpdateTareaDto
    ){
        return this.tareaService.update(id, updateTareaDto);
    }
}