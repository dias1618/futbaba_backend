import { Injectable } from "@nestjs/common";
import { Jogador } from "src/entities/jogador.entity";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { Time } from "src/entities/time.entity";
import { random } from "src/util/random";
import { EncontroService } from "../encontro/encontro.service";
import { TimeJogadorService } from "../time-jogador/time-jogador.service";
import { DivideTimeEstrelas } from "./por-estrelas/divide-time-estrelas";
import { DivideTimeGoleiros } from "./divide-time-goleiros";
import { newDivideTime } from "./factory-divide-time";

@Injectable()
export class RedistribuicaoService{

    constructor(
        private _encontroService:EncontroService,
        private _timeJogadorService:TimeJogadorService
    ){}

    async redistribuir(id:number):Promise<TimeJogador[]>{
        let jogadores:Jogador[] = await this._encontroService.getJogadores(id);
        let times:Time[] = await this._encontroService.getTimes(id);
        await this.limparTimes(times);
        let timesJogadores:TimeJogador[] = this.dividirJogadores(times, jogadores);
        let divideTimeEstrelas = newDivideTime(DivideTimeEstrelas);
        let divideTimeGoleiros = newDivideTime(DivideTimeGoleiros, divideTimeEstrelas);
        divideTimeGoleiros.dividir(timesJogadores);
        this.salvarTimes(timesJogadores);
        this.printJogadores(timesJogadores);
        return timesJogadores;
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

    async limparTimes(times:Time[]){
        for (const time of times) {
            for(const timeJogador of time.timeJogadores){
                await this._timeJogadorService.delete(timeJogador.id);
            }
        }
    }

    private dividirJogadores(times:Time[], jogadores:Jogador[]):TimeJogador[]{
        let timesJogadores:TimeJogador[] = [];
        let jogadoresInicial:Jogador[] = Object.assign(Array<Jogador>(), jogadores);
        let indexTimes:number = 0;
        while(jogadoresInicial.length > 0){
            let posicao:number = random(0, jogadoresInicial.length-1);
            let timeJogador:TimeJogador = new TimeJogador();
            timeJogador.time = times[indexTimes++];
            timeJogador.jogador = jogadoresInicial[posicao];
            timesJogadores.push(timeJogador);
            jogadoresInicial.splice(posicao, 1);
            indexTimes = this.zerarAoChegarAoLimite(indexTimes, times.length);
        }
        return timesJogadores;
    }

    private async salvarTimes(timesJogadores:TimeJogador[]){
        for (const timeJogador of timesJogadores) {
            await this._timeJogadorService.insert(timeJogador);
        }
    }

    private zerarAoChegarAoLimite(indexTimes:number, limite:number){
        if(indexTimes == limite)
            return 0;
        return indexTimes;
    }
}