import { Partida } from "src/entities/partida.entity";

export const PARTIDA_REPOSITORY = 'PARTIDA REPOSITORY';

export interface PartidaRepository{
    insert(partida:Partida):Promise<Partida>;
    update(partida:Partida):Promise<Partida>;
    get(id:number):Promise<Partida>;
    getAll():Promise<Partida[]>;
    delete(id:number):Promise<Partida>;
}


