import { Encontro } from "src/entities/encontro.entity";

export const ENCONTRO_REPOSITORY = 'ENCONTRO REPOSITORY';

export interface EncontroRepository{
    insert(encontro:Encontro):Promise<Encontro>;
    update(encontro:Encontro):Promise<Encontro>;
    get(id:number):Promise<Encontro>;
    getAll():Promise<Encontro[]>;
    delete(id:number):Promise<Encontro>;
}


