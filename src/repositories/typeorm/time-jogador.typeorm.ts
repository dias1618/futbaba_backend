import { TimeJogador } from "src/entities/time-jogador.entity";
import { getRepository } from "typeorm";
import { TimeJogadorRepository } from "../time-jogador.repository";

export class TimeJogadorTypeorm implements TimeJogadorRepository{
    async insert(time:TimeJogador):Promise<TimeJogador> {
        return await getRepository(TimeJogador).save(time);
    }

    async update(time:TimeJogador):Promise<TimeJogador>{
        return await getRepository(TimeJogador).save(time);
    }

    async get(id:number):Promise<TimeJogador>{
        return await getRepository(TimeJogador).createQueryBuilder('time')
            .where(`time.id = :id`, {id: id})
            .getOne();
    }
    
    async delete(id:number):Promise<TimeJogador>{
        let time = await getRepository(TimeJogador).createQueryBuilder('time')
            .where(`time.id = :id`, {id: id})
            .getOne();
        return await getRepository(TimeJogador).remove(time);
    }
    
}