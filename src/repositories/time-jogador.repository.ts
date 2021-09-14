import { TimeJogador } from "src/entities/time-jogador.entity";

export const TIME_JOGADOR_REPOSITORY = 'TIME JOGADOR REPOSITORY';

export interface TimeJogadorRepository{
    insert(time:TimeJogador):Promise<TimeJogador>;
    update(time:TimeJogador):Promise<TimeJogador>;
    get(id:number):Promise<TimeJogador>;
    delete(id:number):Promise<TimeJogador>;
}


