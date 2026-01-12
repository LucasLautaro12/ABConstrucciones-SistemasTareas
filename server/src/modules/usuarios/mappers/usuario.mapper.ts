import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioModel } from "../models/usuario.model"; 

export class UsuarioMapper {
    static toModel(entity: UsuarioModel): UsuarioEntity {
        return new UsuarioEntity({
            id_usuario: entity.id_usuario,
            nombre: entity.nombre,
            apellido: entity.apellido,  
            email: entity.email,
            password: entity.password,
            estado: entity.estado,
        })
    }
}