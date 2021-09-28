import { Baba } from "src/entities/baba.entity";
import { Encontro } from "src/entities/encontro.entity";
import { getRepository } from "typeorm";
import { BabaRepository } from "../baba.repository";

export class BabaTypeorm implements BabaRepository{
    async insert(baba:Baba):Promise<Baba> {
        return await getRepository(Baba).save(baba);
    }

    async update(baba:Baba):Promise<Baba>{
        return await getRepository(Baba).save(baba);
    }

    async get(id:number):Promise<Baba>{
        return await getRepository(Baba).createQueryBuilder('baba')
            .where(`baba.id = :id`, {id: id})
            .getOne();
    }
    
    async getAll():Promise<Baba[]>{
        return await getRepository(Baba).createQueryBuilder('baba')
            .getMany();
    }

    async delete(id:number):Promise<Baba>{
        let baba = await getRepository(Baba).createQueryBuilder('baba')
            .where(`baba.id = :id`, {id: id})
            .getOne();
        return await getRepository(Baba).remove(baba);
    }
    
    async getEncontros(id:number):Promise<Encontro[]>{
        let baba:Baba = await getRepository(Baba).createQueryBuilder('baba')
            .leftJoinAndSelect('baba.encontros', 'encontros')
            .where(`baba.id = :id`, {id: id})
            .getOne();
        return baba.encontros;
    }
    
}