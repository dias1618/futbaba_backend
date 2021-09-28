import { Inject, Injectable } from "@nestjs/common";
import { Baba } from "src/entities/baba.entity";
import { Encontro } from "src/entities/encontro.entity";
import { BabaNaoEncontradoException } from "src/exceptions/baba-nao-encontrado.exception";
import { BabasNaoEncontradosException } from "src/exceptions/babas-nao-encontrados.exception";
import { BabaRepository, BABA_REPOSITORY } from "src/repositories/baba.repository";

@Injectable()
export class BabaService{

    constructor(
        @Inject(BABA_REPOSITORY)
        private _babaRepository: BabaRepository,
    ){}

    async insert(baba:Baba):Promise<any>{
        return await this._babaRepository.insert(baba);
    }

    async update(baba:Baba){
        await this.verificaExistenciaBaba(baba.id);
        return await this._babaRepository.update(baba);
    }

    private async verificaExistenciaBaba(id:number){
        await this.get(id);
    }

    async get(id:number){
        let baba:Baba = await this._babaRepository.get(id);
        if(!baba)
            throw new BabaNaoEncontradoException();
        return baba;
    }

    async getAll(){
        let babas:Baba[] = await this._babaRepository.getAll();
        if(!babas.length)
            throw new BabasNaoEncontradosException();
        return babas;
    }

    async delete(id:number){
        await this.verificaExistenciaBaba(id);
        return await this._babaRepository.delete(id);
    }

    async getEncontros(id:number):Promise<Array<Encontro>>{
        return await this._babaRepository.getEncontros(id);
    }
    
}