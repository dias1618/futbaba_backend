import { TimeJogador } from "src/entities/time-jogador.entity";
import { DivideTime } from "./divide-time";

export class DivideTimeGoleiros implements DivideTime{

    private proximaDivisao:DivideTime;

    constructor(proximaDivisao:DivideTime){
        this.proximaDivisao = proximaDivisao;
    }
    
    dividir(timesJogadores:TimeJogador[]){
        this.proximaDivisao.dividir(timesJogadores);
    }
}