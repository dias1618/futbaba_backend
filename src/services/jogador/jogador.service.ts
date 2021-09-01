import { Inject } from "@nestjs/common";
import { Jogador } from "src/entities/jogador.entity";
import { JogadorNaoEncontradoException } from "src/exceptions/jogador-nao-encontrado.exception";
import { JogadoresNaoEncontradosException } from "src/exceptions/jogadores-nao-encontrados.exception";
import { JogadorRepository, JOGADOR_REPOSITORY } from "src/repositories/jogador.repository";

export class JogadorService{

    constructor(
        @Inject(JOGADOR_REPOSITORY)
        private _jogadorRepository: JogadorRepository,       
    ){}

    async insert(jogador:Jogador):Promise<any>{
        return await this._jogadorRepository.insert(jogador);
    }

    async update(jogador:Jogador){
        await this.verificaExistenciaJogador(jogador.id);
        return await this._jogadorRepository.update(jogador);
    }

    private async verificaExistenciaJogador(id:number){
        await this.get(id);
    }

    async get(id:number){
        let jogador:Jogador = await this._jogadorRepository.get(id);
        if(!jogador)
            throw new JogadorNaoEncontradoException();
        return jogador;
    }

    async getAll(){
        let jogadores:Jogador[] = await this._jogadorRepository.getAll();
        if(!jogadores.length)
            throw new JogadoresNaoEncontradosException();
        return jogadores;
    }

    async delete(id:number){
        await this.verificaExistenciaJogador(id);
        return await this._jogadorRepository.delete(id);
    }

}