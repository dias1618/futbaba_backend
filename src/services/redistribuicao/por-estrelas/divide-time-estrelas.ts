import { Jogador } from "src/entities/jogador.entity";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";
import { DivideTime } from "../divide-time";
import { GerenciaTimeJogadores } from "./gerencia-time-jogadores";
import { ListaTimeQuantidadeJogadoresNivel } from "./lista-time-quantidade-jogadores-nivel";
import { TimeQuantidadeJogadoresNivel } from "./time-quantidade-jogadores-nivel";

export class DivideTimeEstrelas implements DivideTime{
    constructor(proximaDivisao:DivideTime){

    }

    public dividir(timesJogadores:TimeJogador[]):void{
        let gerenciaTimeJogadores:GerenciaTimeJogadores = new GerenciaTimeJogadores(timesJogadores);
        let nivelAnalise:number = gerenciaTimeJogadores.getNivelMaximo();
        let nivelMinimo:number = gerenciaTimeJogadores.getNivelMinimo();
        while(nivelAnalise > nivelMinimo){
            let listTimeQuantidadeJogadoresNivel:ListaTimeQuantidadeJogadoresNivel = new ListaTimeQuantidadeJogadoresNivel(gerenciaTimeJogadores.getTimes(), gerenciaTimeJogadores.getJogadoresNivel(nivelAnalise));
            this.equilibrarJogadoresEntreTimes(listTimeQuantidadeJogadoresNivel, gerenciaTimeJogadores);
            nivelAnalise--;
        }
        this.verificarNivelamento(timesJogadores);
    }

    private equilibrarJogadoresEntreTimes(listTimeQuantidadeJogadoresNivel:ListaTimeQuantidadeJogadoresNivel, gerenciaTimeJogadores:GerenciaTimeJogadores){
        for(let i=0; i < (listTimeQuantidadeJogadoresNivel.getQuantidadeTimes()-1); i++){
            for(let j=i+1; j < listTimeQuantidadeJogadoresNivel.getQuantidadeTimes(); j++){
                let timeAnalise:TimeQuantidadeJogadoresNivel = listTimeQuantidadeJogadoresNivel.get(i);
                let timeComparacao:TimeQuantidadeJogadoresNivel = listTimeQuantidadeJogadoresNivel.get(j);
                if(timeAnalise.possuiMaisJogadores(timeComparacao, 1)){
                    gerenciaTimeJogadores.trocaJogador(timeAnalise.time, timeComparacao.time, listTimeQuantidadeJogadoresNivel.getNivel());
                    listTimeQuantidadeJogadoresNivel.subJogador(i);
                    listTimeQuantidadeJogadoresNivel.addJogador(j);
                    i=-1;
                    break;
                } else if(timeComparacao.possuiMaisJogadores(timeAnalise, 1)){
                    gerenciaTimeJogadores.trocaJogador(timeComparacao.time, timeAnalise.time, listTimeQuantidadeJogadoresNivel.getNivel());
                    listTimeQuantidadeJogadoresNivel.addJogador(i);
                    listTimeQuantidadeJogadoresNivel.subJogador(j);
                    i=-1;
                    break;
                }
            }
        }
    }

    private verificarNivelamento(timesJogadores:TimeJogador[]){
        let listaPrintTimeJogador:{time:Time, jogadores:Jogador[], qtEstrelas:number}[] = [];
        for (const timeJogador of timesJogadores) {
            let achadoTime:boolean = false;
            for(const printTimeJogador of listaPrintTimeJogador){
                if(printTimeJogador.time.id == timeJogador.time.id){
                    printTimeJogador.jogadores.push(timeJogador.jogador);
                    printTimeJogador.qtEstrelas += timeJogador.jogador.qtEstrelas;
                    achadoTime = true;
                    break;
                }
            }       

            if(!achadoTime){
                listaPrintTimeJogador.push({time: timeJogador.time, jogadores: [timeJogador.jogador], qtEstrelas: timeJogador.jogador.qtEstrelas});
            }
        }
    
        let desequilibrado:boolean = true;
        while(desequilibrado){
            let timeContMaior:{time:Time, jogadores:Jogador[], qtEstrelas:number};
            let timeContMenor:{time:Time, jogadores:Jogador[], qtEstrelas:number};
            for (const printTimeJogador of listaPrintTimeJogador) {
                if(timeContMaior == null || printTimeJogador.qtEstrelas >= timeContMaior.qtEstrelas)
                    timeContMaior = printTimeJogador;
                if(timeContMenor == null || printTimeJogador.qtEstrelas <= timeContMenor.qtEstrelas)
                    timeContMenor = printTimeJogador;
            }

            if(timeContMaior.qtEstrelas > (timeContMenor.qtEstrelas + 3)){
                let jogadorComMaisEstrelas:Jogador;
                for(const jogadorTimeMaior of timeContMaior.jogadores){
                    if(jogadorComMaisEstrelas == null || jogadorTimeMaior.qtEstrelas > jogadorComMaisEstrelas.qtEstrelas){
                        jogadorComMaisEstrelas = jogadorTimeMaior;
                    }
                }
                let jogadorComMenosEstrelas:Jogador;
                for(const jogadorTimeMenor of timeContMenor.jogadores){
                    if(jogadorComMenosEstrelas == null || jogadorTimeMenor.qtEstrelas < jogadorComMenosEstrelas.qtEstrelas){
                        jogadorComMenosEstrelas = jogadorTimeMenor;
                    }
                }

                let jogadorMaiorAux:Jogador;
                for (var indiceTime in listaPrintTimeJogador) {
                    let printTimeJogador = listaPrintTimeJogador[indiceTime];
                    if(printTimeJogador.time.id == timeContMaior.time.id){
                        for (var indiceJogador in printTimeJogador.jogadores) {
                            if(jogadorComMaisEstrelas.id == printTimeJogador.jogadores[indiceJogador].id){
                                jogadorMaiorAux = printTimeJogador.jogadores[indiceJogador];
                                printTimeJogador.jogadores[indiceJogador] = jogadorComMenosEstrelas;
                                listaPrintTimeJogador[indiceTime].qtEstrelas -= jogadorMaiorAux.qtEstrelas;
                                listaPrintTimeJogador[indiceTime].qtEstrelas += printTimeJogador.jogadores[indiceJogador].qtEstrelas;
                                for(var indiceTimeJogador in timesJogadores){
                                    if(timesJogadores[indiceTimeJogador].jogador.id == jogadorComMenosEstrelas.id){
                                        timesJogadores[indiceTimeJogador].time = printTimeJogador.time;
                                    }
                                }
                            }
                        }
                    }
                }
                for (var indiceTime in listaPrintTimeJogador) {
                    let printTimeJogador = listaPrintTimeJogador[indiceTime];
                    if(printTimeJogador.time.id == timeContMenor.time.id){
                        for (var indiceJogador in printTimeJogador.jogadores) {
                            if(jogadorComMenosEstrelas.id == printTimeJogador.jogadores[indiceJogador].id){
                                printTimeJogador.jogadores[indiceJogador] = jogadorMaiorAux;
                                listaPrintTimeJogador[indiceTime].qtEstrelas -= jogadorComMenosEstrelas.qtEstrelas;
                                listaPrintTimeJogador[indiceTime].qtEstrelas += jogadorMaiorAux.qtEstrelas;
                                for(var indiceTimeJogador in timesJogadores){
                                    if(timesJogadores[indiceTimeJogador].jogador.id == jogadorComMaisEstrelas.id){
                                        timesJogadores[indiceTimeJogador].time = printTimeJogador.time;
                                    }
                                }
                            }
                        }
                    }
                }

            } else {
                desequilibrado = false;
            }
        }
        
    }

}