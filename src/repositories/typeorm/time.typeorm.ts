import { Time } from "src/entities/time.entity";
import { getRepository } from "typeorm";
import { TimeRepository } from "../time.repository";

export class TimeTypeorm implements TimeRepository{
    async insert(time:Time):Promise<Time> {
        return await getRepository(Time).save(time);
    }

    async update(time:Time):Promise<Time>{
        return await getRepository(Time).save(time);
    }

    async get(id:number):Promise<Time>{
        return await getRepository(Time).createQueryBuilder('time')
            .where(`time.id = :id`, {id: id})
            .getOne();
    }
    
    async getAll():Promise<Time[]>{
        return await getRepository(Time).createQueryBuilder('time')
            .getMany();
    }

    async delete(id:number):Promise<Time>{
        let time = await getRepository(Time).createQueryBuilder('time')
            .where(`time.id = :id`, {id: id})
            .getOne();
        return await getRepository(Time).remove(time);
    }
    
}