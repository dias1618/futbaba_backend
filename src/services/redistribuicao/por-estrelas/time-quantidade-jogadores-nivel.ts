import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";
import { JogadoresNivel } from "./jogadores-nivel";

export class TimeQuantidadeJogadoresNivel{
    private _time:Time;
    private _quantidadeJogadores:number;

    constructor(time:Time){
        this._time = time;
        this._quantidadeJogadores = 0;
    }

    verificarQuantidadeJogadores(jogadoresNivel:JogadoresNivel){
        for(const jogadorNivel of jogadoresNivel.timeJogadoresNivel){
            if(jogadorNivel.time.id == this._time.id)
                this.addJogador();
        }
    }
    
    addJogador(){
        this._quantidadeJogadores++;
    }
    
    subJogador(){
        this._quantidadeJogadores--;
    }
    
    get quantidadeJogadores(){
        return this._quantidadeJogadores
    }

    get time(){
        return this._time;
    }

    possuiMaisJogadores(timeQuantidadeJogadoresNivelComparacao:TimeQuantidadeJogadoresNivel, margemAMais:number){
        return this._quantidadeJogadores > timeQuantidadeJogadoresNivelComparacao.quantidadeJogadores+margemAMais;
    }
}