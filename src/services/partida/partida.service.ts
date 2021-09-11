import { Inject } from "@nestjs/common";
import { Partida } from "src/entities/partida.entity";
import { PartidaNaoEncontradoException } from "src/exceptions/partida-nao-encontrado.exception";
import { PartidasNaoEncontradosException } from "src/exceptions/partidas-nao-encontrados.exception";
import { PartidaRepository, PARTIDA_REPOSITORY } from "src/repositories/partida.repository";

export class PartidaService{

    constructor(
        @Inject(PARTIDA_REPOSITORY)
        private _partidaRepository: PartidaRepository,       
    ){}

    async insert(partida:Partida):Promise<any>{
        return await this._partidaRepository.insert(partida);
    }

    async update(partida:Partida){
        await this.verificaExistenciaPartida(partida.id);
        return await this._partidaRepository.update(partida);
    }

    private async verificaExistenciaPartida(id:number){
        await this.get(id);
    }

    async get(id:number){
        let partida:Partida = await this._partidaRepository.get(id);
        if(!partida)
            throw new PartidaNaoEncontradoException();
        return partida;
    }

    async getAll(){
        let partidas:Partida[] = await this._partidaRepository.getAll();
        if(!partidas.length)
            throw new PartidasNaoEncontradosException();
        return partidas;
    }

    async delete(id:number){
        await this.verificaExistenciaPartida(id);
        return await this._partidaRepository.delete(id);
    }

}