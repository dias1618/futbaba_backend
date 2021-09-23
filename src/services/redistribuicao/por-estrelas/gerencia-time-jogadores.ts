import { Jogador } from "src/entities/jogador.entity";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";
import { JogadoresNivel } from "./jogadores-nivel";

export class GerenciaTimeJogadores{
    private _timeJogadores:TimeJogador[];

    constructor(timeJogadores:TimeJogador[]){
        this._timeJogadores = timeJogadores;
    }


    public getNivelMaximo():number{
        let timeJogadorNivelMaximo:TimeJogador;
        for (const timeJogador of this._timeJogadores) {
            if(!timeJogadorNivelMaximo || timeJogador.jogador.qtEstrelas > timeJogadorNivelMaximo.jogador.qtEstrelas)
                timeJogadorNivelMaximo = timeJogador;
        }
        return timeJogadorNivelMaximo.jogador.qtEstrelas;
    }

    public getNivelMinimo():number{
        let timeJogadorNivelMinimo:TimeJogador;
        for (const timeJogador of this._timeJogadores) {
            if(!timeJogadorNivelMinimo || timeJogador.jogador.qtEstrelas < timeJogadorNivelMinimo.jogador.qtEstrelas)
                timeJogadorNivelMinimo = timeJogador;
        }
        return timeJogadorNivelMinimo.jogador.qtEstrelas;
    }

    public getTimes(){
        let times:Time[] = [];
        for (const timeJogador of this._timeJogadores) {
            let achado:boolean = false;
            for (const time of times) {
                if(timeJogador.time.id == time.id)
                    achado = true;
            }
            if(!achado)
                times.push(timeJogador.time);
        }
        return times;
    }
     
    public getJogadoresNivel(nivel:number){
        let timeJogadoresNivel:TimeJogador[] = [];
        for (const timeJogador of this._timeJogadores) {
            if(timeJogador.jogador.qtEstrelas == nivel)
                timeJogadoresNivel.push(timeJogador);
        }
        return new JogadoresNivel(timeJogadoresNivel, nivel);
    }
 
    
    trocaJogador(timeComMaisJogadores:Time, timeComMenosJogadores:Time, nivel:number){
        for (const timeJogador of this._timeJogadores) {
            if(this.isJogadorNivel(timeJogador, timeComMaisJogadores, nivel)){
                for (const timeJogadorTroca of this._timeJogadores) {
                    if(this.isJogadorMenorNivel(timeJogadorTroca, timeComMenosJogadores, nivel)){
                        let jogadorAux:Jogador = timeJogador.jogador;
                        timeJogador.jogador = timeJogadorTroca.jogador;
                        timeJogadorTroca.jogador = jogadorAux;
                        return;
                    }
                }
            }
        }
    }

    private isJogadorNivel(timeJogador:TimeJogador, time:Time, nivel:number){
        return timeJogador.time.id == time.id && timeJogador.jogador.qtEstrelas == nivel;
    }
    
    private isJogadorMenorNivel(timeJogador:TimeJogador, time:Time, nivel:number){
        return timeJogador.time.id == time.id && timeJogador.jogador.qtEstrelas < nivel;
    }

}