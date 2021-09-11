import { Encontro } from "src/entities/encontro.entity";
import { getRepository } from "typeorm";
import { EncontroRepository } from "../encontro.repository";

export class EncontroTypeorm implements EncontroRepository{
    async insert(encontro:Encontro):Promise<Encontro> {
        return await getRepository(Encontro).save(encontro);
    }

    async update(encontro:Encontro):Promise<Encontro>{
        return await getRepository(Encontro).save(encontro);
    }

    async get(id:number):Promise<Encontro>{
        return await getRepository(Encontro).createQueryBuilder('encontro')
            .where(`encontro.id = :id`, {id: id})
            .getOne();
    }
    
    async getAll():Promise<Encontro[]>{
        return await getRepository(Encontro).createQueryBuilder('encontro')
            .getMany();
    }

    async delete(id:number):Promise<Encontro>{
        let encontro = await getRepository(Encontro).createQueryBuilder('encontro')
            .where(`encontro.id = :id`, {id: id})
            .getOne();
        return await getRepository(Encontro).remove(encontro);
    }
    
}