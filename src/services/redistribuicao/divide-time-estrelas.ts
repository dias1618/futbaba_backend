import { Jogador } from "src/entities/jogador.entity";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";
import { DivideTime } from "./divide-time";

export class DivideTimeEstrelas implements DivideTime{
    constructor(proximaDivisao:DivideTime){

    }

    dividir(timesJogadores:TimeJogador[]){
        let nivelAnalise:number = getNivelMaximo(timesJogadores);
        let nivelMinimo:number = getNivelMinimo(timesJogadores);
        let times:Time[] = getTimes(timesJogadores);
        while(nivelAnalise > nivelMinimo){

            let jogadoresNivel:TimeJogador[] = getJogadoresNivel(nivelAnalise, timesJogadores);
            this.distribuirPorNivel(times, jogadoresNivel, timesJogadores, nivelAnalise);

            nivelAnalise--;
        }
    }


    private distribuirPorNivel(times:Time[], jogadoresNivel:TimeJogador[], timesJogadores:TimeJogador[], nivelAnalise:number){
        let listTimeContJogador:{time:Time, contJogador:number}[] = [];

        //contabilizar quantidade de jogadores em cada time
        for (const time of times) {
            let timeContJogador:{time:Time, contJogador:number} = {time: time, contJogador: 0};
            for(const jogadorNivel of jogadoresNivel){
                if(jogadorNivel.time.id == time.id)
                    timeContJogador.contJogador++;
            }
            listTimeContJogador.push(timeContJogador);
        }

        //Verifica se algum time está com mais jogadores desse nivel do que os outros
        for(let i=0; i < (listTimeContJogador.length-1); i++){
            for(let j=i+1; j < listTimeContJogador.length; j++){
                let timeContJogador = listTimeContJogador[i];
                let timeContJogadorComparacao = listTimeContJogador[j];
                if(timeContJogador.contJogador > (timeContJogadorComparacao.contJogador+1)){
                    this.trocaJogador(timeContJogador.time, timeContJogadorComparacao.time, timesJogadores, nivelAnalise);
                    listTimeContJogador[i].contJogador--;
                    listTimeContJogador[j].contJogador++;
                    i=0;
                    j=1;
                    break;
                } else if(timeContJogador.contJogador < (timeContJogadorComparacao.contJogador-1)){
                    this.trocaJogador(timeContJogadorComparacao.time, timeContJogador.time, timesJogadores, nivelAnalise);
                    listTimeContJogador[i].contJogador++;
                    listTimeContJogador[j].contJogador--;
                    i=0;
                    j=1;
                    break;
                }
            }
        }

    }

    trocaJogador(timeComMaisJogadores:Time, timeComMenosJogadores:Time, timesJogadores:TimeJogador[], nivelAnalise:number){
        for (const timeJogador of timesJogadores) {
            if(timeJogador.time.id == timeComMaisJogadores.id && timeJogador.jogador.qtEstrelas == nivelAnalise){
                for (const timeJogadorTroca of timesJogadores) {
                    if(timeJogadorTroca.time.id == timeComMenosJogadores.id && timeJogadorTroca.jogador.qtEstrelas < nivelAnalise){
                        let jogadorAux:Jogador = timeJogador.jogador;
                        timeJogador.jogador = timeJogadorTroca.jogador;
                        timeJogadorTroca.jogador = jogadorAux;
                    }
                }
            }
        }
    }
}