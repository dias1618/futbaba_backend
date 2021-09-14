import { Encontro } from "src/entities/encontro.entity";
import { Jogador } from "src/entities/jogador.entity";
import { Partida } from "src/entities/partida.entity";
import { Time } from "src/entities/time.entity";

export const ENCONTRO_REPOSITORY = 'ENCONTRO REPOSITORY';

export interface EncontroRepository{
    insert(encontro:Encontro):Promise<Encontro>;
    update(encontro:Encontro):Promise<Encontro>;
    get(id:number):Promise<Encontro>;
    getAll():Promise<Encontro[]>;
    delete(id:number):Promise<Encontro>;
    getPartidas(id:number):Promise<Array<Partida>>;
    getTimes(id:number):Promise<Array<Time>>;
    getJogadores(id:number):Promise<Array<Jogador>>;
}


