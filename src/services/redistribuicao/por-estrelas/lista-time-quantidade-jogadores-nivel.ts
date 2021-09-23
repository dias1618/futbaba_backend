import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";
import { JogadoresNivel } from "./jogadores-nivel";
import { TimeQuantidadeJogadoresNivel } from "./time-quantidade-jogadores-nivel";

export class ListaTimeQuantidadeJogadoresNivel{
    private _listaTimeQuantidadeJogadoresNivel:TimeQuantidadeJogadoresNivel[];
    private _times:Time[];
    private _jogadoresNivel:JogadoresNivel;

    constructor(times:Time[], jogadoresNivel:JogadoresNivel){
        this._listaTimeQuantidadeJogadoresNivel = [];
        this._times = times;
        this._jogadoresNivel = jogadoresNivel;
        this.preencherTimes();
    }

    preencherTimes(){
        for (const time of this._times) {
            let timeQuantidadeJogadoresNivel:TimeQuantidadeJogadoresNivel = new TimeQuantidadeJogadoresNivel(time);
            timeQuantidadeJogadoresNivel.verificarQuantidadeJogadores(this._jogadoresNivel);        
            this._listaTimeQuantidadeJogadoresNivel.push(timeQuantidadeJogadoresNivel);
        }
    }

    getQuantidadeTimes():number{
        return this._listaTimeQuantidadeJogadoresNivel.length;
    }

    addJogador(indiceTime:number){
        this._listaTimeQuantidadeJogadoresNivel[indiceTime].addJogador();
    }

    subJogador(indiceTime:number){
        this._listaTimeQuantidadeJogadoresNivel[indiceTime].subJogador();
    }

    get(indice:number){
        return this._listaTimeQuantidadeJogadoresNivel[indice];
    }

    getNivel(){
        return this._jogadoresNivel.nivel;
    }
}