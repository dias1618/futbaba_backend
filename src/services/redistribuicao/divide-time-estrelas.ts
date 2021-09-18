import { Jogador } from "src/entities/jogador.entity";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";
import { DivideTime } from "./divide-time";

export class DivideTimeEstrelas implements DivideTime{
    constructor(proximaDivisao:DivideTime){

    }

    public dividir(timesJogadores:TimeJogador[]):void{
        console.log('Inicio');
        let nivelAnalise:number = this.getNivelMaximo(timesJogadores);
        console.log('nivelAnalise = ', nivelAnalise);
        let nivelMinimo:number = this.getNivelMinimo(timesJogadores);
        console.log('nivelMinimo = ', nivelMinimo);
        let times:Time[] = this.getTimes(timesJogadores);
        console.log('times = ', times);
        this.printJogadores(timesJogadores);
        while(nivelAnalise > nivelMinimo){
            let jogadoresNivel:TimeJogador[] = this.getJogadoresNivel(timesJogadores, nivelAnalise);
            console.log('Jogadores do nível: ', nivelAnalise)
            for(const jogadorNivel of jogadoresNivel){
                console.log(jogadorNivel.jogador.nmJogador)
            }
            console.log('')
            this.distribuirPorNivel(times, jogadoresNivel, timesJogadores, nivelAnalise);
            nivelAnalise--;
            this.printJogadores(timesJogadores);
        }
        console.log('VERIFICACAO FINAL')
        this.verificarNivelamento(timesJogadores);
        this.printJogadores(timesJogadores);
    }

    private printJogadores(timesJogadores:TimeJogador[]){
        console.log('')
        console.log('-----------INICIO PRINT--------------------')
        let listaPrintTimeJogador:{time:Time, jogadores:Jogador[]}[] = [];
        for (const timeJogador of timesJogadores) {
            let achadoTime:boolean = false;
            for(const printTimeJogador of listaPrintTimeJogador){
                if(printTimeJogador.time.id == timeJogador.time.id){
                    printTimeJogador.jogadores.push(timeJogador.jogador);
                    achadoTime = true;
                    break;
                }
            }       

            if(!achadoTime){
                listaPrintTimeJogador.push({time: timeJogador.time, jogadores: [timeJogador.jogador]});
            }
        }

        for (const printTimeJogador of listaPrintTimeJogador) {
            console.log('Time: ', printTimeJogador.time.nmTime);
            for(const jogador of printTimeJogador.jogadores){
                console.log('Jogador: ', jogador.nmJogador, ', Nivel: ', jogador.qtEstrelas);
            }
            console.log('');
        }
        console.log('-----------FIM PRINT--------------------')
        console.log('')
    }

    private getNivelMaximo(timesJogadores:TimeJogador[]):number{
        let timeJogadorNivelMaximo:TimeJogador;
        for (const timeJogador of timesJogadores) {
            if(!timeJogadorNivelMaximo || timeJogador.jogador.qtEstrelas > timeJogadorNivelMaximo.jogador.qtEstrelas)
                timeJogadorNivelMaximo = timeJogador;
        }
        return timeJogadorNivelMaximo.jogador.qtEstrelas;
    }

    private getNivelMinimo(timesJogadores:TimeJogador[]):number{
        let timeJogadorNivelMinimo:TimeJogador;
        for (const timeJogador of timesJogadores) {
            if(!timeJogadorNivelMinimo || timeJogador.jogador.qtEstrelas < timeJogadorNivelMinimo.jogador.qtEstrelas)
                timeJogadorNivelMinimo = timeJogador;
        }
        return timeJogadorNivelMinimo.jogador.qtEstrelas;
    }

    private getTimes(timesJogadores:TimeJogador[]){
        let times:Time[] = [];
        for (const timeJogador of timesJogadores) {
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
    
    private getJogadoresNivel(timesJogadores:TimeJogador[], nivelAnalise:number){
        let timesJogadoresNivel:TimeJogador[] = [];
        for (const timeJogador of timesJogadores) {
            if(timeJogador.jogador.qtEstrelas == nivelAnalise)
                timesJogadoresNivel.push(timeJogador);
        }
        return timesJogadoresNivel;
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
        console.log(listTimeContJogador);
        for(let i=0; i < (listTimeContJogador.length-1); i++){
            for(let j=i+1; j < listTimeContJogador.length; j++){
                let timeContJogador = listTimeContJogador[i];
                let timeContJogadorComparacao = listTimeContJogador[j];
                console.log('')
                console.log('i = ', i, ' - ', timeContJogador)
                console.log('j = ', j, ' - ', timeContJogadorComparacao)
                if(timeContJogador.contJogador > (timeContJogadorComparacao.contJogador+1)){
                    console.log('troca 1')
                    this.trocaJogador(timeContJogador.time, timeContJogadorComparacao.time, timesJogadores, nivelAnalise);
                    listTimeContJogador[i].contJogador--;
                    listTimeContJogador[j].contJogador++;
                    i=-1;
                    break;
                } else if(timeContJogador.contJogador < (timeContJogadorComparacao.contJogador-1)){
                    console.log('troca 2')
                    this.trocaJogador(timeContJogadorComparacao.time, timeContJogador.time, timesJogadores, nivelAnalise);
                    listTimeContJogador[i].contJogador++;
                    listTimeContJogador[j].contJogador--;
                    i=-1;
                    break;
                }
                console.log('sem troca')

            }
        }

    }

    private trocaJogador(timeComMaisJogadores:Time, timeComMenosJogadores:Time, timesJogadores:TimeJogador[], nivelAnalise:number){
        for (const timeJogador of timesJogadores) {
            if(timeJogador.time.id == timeComMaisJogadores.id && timeJogador.jogador.qtEstrelas == nivelAnalise){
                for (const timeJogadorTroca of timesJogadores) {
                    if(timeJogadorTroca.time.id == timeComMenosJogadores.id && timeJogadorTroca.jogador.qtEstrelas < nivelAnalise){
                        let jogadorAux:Jogador = timeJogador.jogador;
                        timeJogador.jogador = timeJogadorTroca.jogador;
                        timeJogadorTroca.jogador = jogadorAux;
                        return;
                    }
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

            console.log('timeContMaior = ', timeContMaior)
            console.log('timeContMenor = ', timeContMenor)

            if(timeContMaior.qtEstrelas > (timeContMenor.qtEstrelas + 5)){
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