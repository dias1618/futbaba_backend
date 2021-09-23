import { Jogador } from "src/entities/jogador.entity";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";

export class JogadoresNivel{
    private _timeJogadoresNivel:TimeJogador[];
    private _nivel:number;

    constructor(timeJogadoresNivel:TimeJogador[], nivel:number){
        this._nivel = nivel;
        this._timeJogadoresNivel = timeJogadoresNivel;
    }


    get timeJogadoresNivel():TimeJogador[]{
        return this._timeJogadoresNivel;
    }

    get nivel(){
        return this._nivel;
    }
}