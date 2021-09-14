import { Inject, Injectable } from "@nestjs/common";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { TimeJogadorNaoEncontradoException } from "src/exceptions/time-jogador-nao-encontrado.exception";
import { TIME_JOGADOR_REPOSITORY } from "src/repositories/time-jogador.repository";
import { TimeJogadorRepository } from "src/repositories/time-jogador.repository";

@Injectable()
export class TimeJogadorService{

    constructor(
        @Inject(TIME_JOGADOR_REPOSITORY)
        private _timeJogadorRepository: TimeJogadorRepository,       
    ){}

    async insert(timeJogador:TimeJogador):Promise<any>{
        return await this._timeJogadorRepository.insert(timeJogador);
    }

    async update(timeJogador:TimeJogador){
        await this.verificaExistenciaTimeJogador(timeJogador.id);
        return await this._timeJogadorRepository.update(timeJogador);
    }

    private async verificaExistenciaTimeJogador(id:number){
        await this.get(id);
    }

    async get(id:number){
        let timeJogador:TimeJogador = await this._timeJogadorRepository.get(id);
        if(!timeJogador)
            throw new TimeJogadorNaoEncontradoException();
        return timeJogador;
    }

    async delete(id:number){
        await this.verificaExistenciaTimeJogador(id);
        return await this._timeJogadorRepository.delete(id);
    }

}