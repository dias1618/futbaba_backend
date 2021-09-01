import { Jogador } from "src/entities/jogador.entity";
import { getRepository } from "typeorm";
import { JogadorRepository } from "../jogador.repository";

export class JogadorTypeorm implements JogadorRepository{
    async insert(jogador:Jogador):Promise<Jogador> {
        return await getRepository(Jogador).save(jogador);
    }

    async update(jogador:Jogador):Promise<Jogador>{
        return await getRepository(Jogador).save(jogador);
    }

    async get(id:number):Promise<Jogador>{
        return await getRepository(Jogador).createQueryBuilder('jogador')
            .where(`jogador.id = :id`, {id: id})
            .getOne();
    }
    
    async getAll():Promise<Jogador[]>{
        return await getRepository(Jogador).createQueryBuilder('jogador')
            .getMany();
    }

    async delete(id:number):Promise<Jogador>{
        let jogador = await getRepository(Jogador).createQueryBuilder('jogador')
            .where(`jogador.id = :id`, {id: id})
            .getOne();
        return await getRepository(Jogador).remove(jogador);
    }
    
}