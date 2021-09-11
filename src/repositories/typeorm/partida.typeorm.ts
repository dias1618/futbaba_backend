import { Partida } from "src/entities/partida.entity";
import { getRepository } from "typeorm";
import { PartidaRepository } from "../partida.repository";

export class PartidaTypeorm implements PartidaRepository{
    async insert(partida:Partida):Promise<Partida> {
        return await getRepository(Partida).save(partida);
    }

    async update(partida:Partida):Promise<Partida>{
        return await getRepository(Partida).save(partida);
    }

    async get(id:number):Promise<Partida>{
        return await getRepository(Partida).createQueryBuilder('partida')
            .where(`partida.id = :id`, {id: id})
            .getOne();
    }
    
    async getAll():Promise<Partida[]>{
        return await getRepository(Partida).createQueryBuilder('partida')
            .getMany();
    }

    async delete(id:number):Promise<Partida>{
        let partida = await getRepository(Partida).createQueryBuilder('partida')
            .where(`partida.id = :id`, {id: id})
            .getOne();
        return await getRepository(Partida).remove(partida);
    }
    
}