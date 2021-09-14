import { TimeJogador } from "src/entities/time-jogador.entity";

export interface DivideTime{
    dividir(timesJogadores:TimeJogador[]):void;
}