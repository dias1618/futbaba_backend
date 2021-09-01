import { Jogador } from "src/entities/jogador.entity";

export const JOGADOR_REPOSITORY = 'JOGADOR REPOSITORY';

export interface JogadorRepository{
    insert(jogador:Jogador):Promise<Jogador>;
    update(jogador:Jogador):Promise<Jogador>;
    get(id:number):Promise<Jogador>;
    getAll():Promise<Jogador[]>;
    delete(id:number):Promise<Jogador>;
}


