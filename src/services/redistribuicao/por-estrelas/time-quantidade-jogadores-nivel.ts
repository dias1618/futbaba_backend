import { Time } from "src/entities/time.entity";

export class TimeQuantidadeJogadoresNivel{
    private _time:Time;
    private _quantidadeJogadores:number;

    constructor(time:Time){
        this._time = time;
        this._quantidadeJogadores = 0;
    }

    addJogador(){
        this._quantidadeJogadores++;
    }
}