import { Inject } from "@nestjs/common";
import { Encontro } from "src/entities/encontro.entity";
import { Partida } from "src/entities/partida.entity";
import { Time } from "src/entities/time.entity";
import { EncontroNaoEncontradoException } from "src/exceptions/encontro-nao-encontrado.exception";
import { EncontrosNaoEncontradosException } from "src/exceptions/encontros-nao-encontrados.exception";
import { EncontroRepository, ENCONTRO_REPOSITORY } from "src/repositories/encontro.repository";

export class EncontroService{

    constructor(
        @Inject(ENCONTRO_REPOSITORY)
        private _encontroRepository: EncontroRepository,       
    ){}

    async insert(encontro:Encontro):Promise<any>{
        return await this._encontroRepository.insert(encontro);
    }

    async update(encontro:Encontro){
        await this.verificaExistenciaEncontro(encontro.id);
        return await this._encontroRepository.update(encontro);
    }

    private async verificaExistenciaEncontro(id:number){
        await this.get(id);
    }

    async get(id:number){
        let encontro:Encontro = await this._encontroRepository.get(id);
        if(!encontro)
            throw new EncontroNaoEncontradoException();
        return encontro;
    }

    async getAll(){
        let encontros:Encontro[] = await this._encontroRepository.getAll();
        if(!encontros.length)
            throw new EncontrosNaoEncontradosException();
        return encontros;
    }

    async delete(id:number){
        await this.verificaExistenciaEncontro(id);
        return await this._encontroRepository.delete(id);
    }

    async getPartidas(id:number):Promise<Array<Partida>>{
        return await this._encontroRepository.getPartidas(id);
    }
    
    async getTimes(id:number):Promise<Array<Time>>{
        return await this._encontroRepository.getTimes(id);
    }
}