import { Inject, Injectable } from "@nestjs/common";
import { Time } from "src/entities/time.entity";
import { TimeNaoEncontradoException } from "src/exceptions/time-nao-encontrado.exception";
import { TimesNaoEncontradosException } from "src/exceptions/times-nao-encontrados.exception";
import { TimeRepository, TIME_REPOSITORY } from "src/repositories/time.repository";

@Injectable()
export class TimeService{

    constructor(
        @Inject(TIME_REPOSITORY)
        private _timeRepository: TimeRepository,       
    ){}

    async insert(time:Time):Promise<any>{
        return await this._timeRepository.insert(time);
    }

    async update(time:Time){
        await this.verificaExistenciaTime(time.id);
        return await this._timeRepository.update(time);
    }

    private async verificaExistenciaTime(id:number){
        await this.get(id);
    }

    async get(id:number){
        let time:Time = await this._timeRepository.get(id);
        if(!time)
            throw new TimeNaoEncontradoException();
        return time;
    }

    async getAll(){
        let times:Time[] = await this._timeRepository.getAll();
        if(!times.length)
            throw new TimesNaoEncontradosException();
        return times;
    }

    async delete(id:number){
        await this.verificaExistenciaTime(id);
        return await this._timeRepository.delete(id);
    }

    async removerJogadores(time:Time){
        time.timeJogadores = [];
        await this.update(time);
    }
}