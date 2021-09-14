import { Encontro } from "src/entities/encontro.entity";
import { Jogador } from "src/entities/jogador.entity";
import { Partida } from "src/entities/partida.entity";
import { Time } from "src/entities/time.entity";
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
    
    async getPartidas(id:number):Promise<Partida[]>{
        let encontro:Encontro = await getRepository(Encontro).createQueryBuilder('encontro')
            .leftJoinAndSelect('encontro.partidas', 'partidas')
            .where(`encontro.id = :id`, {id: id})
            .getOne();
        return encontro.partidas;
    }
    
    async getTimes(id:number):Promise<Time[]>{
        let encontro:Encontro = await getRepository(Encontro).createQueryBuilder('encontro')
            .leftJoinAndSelect('encontro.times', 'times')
            .leftJoinAndSelect('times.timeJogadores', 'timeJogadores')
            .where(`encontro.id = :id`, {id: id})
            .getOne();
        return encontro.times;
    }
    
    async getJogadores(id:number):Promise<Jogador[]>{
        let encontro:Encontro = await getRepository(Encontro).createQueryBuilder('encontro')
            .leftJoinAndSelect('encontro.jogadores', 'jogadores')
            .where(`encontro.id = :id`, {id: id})
            .getOne();
        return encontro.jogadores;
    }
    
}