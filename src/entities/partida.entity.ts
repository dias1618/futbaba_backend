import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Encontro } from "./encontro.entity";
import { PartidaGol } from "./partida-gol.entity";
import { PartidaTime } from "./partida-time.entity";

@Entity()
export class Partida extends BaseEntity{

    constructor(data?: {id?:number}){
        super();
        this.id = data && data.id || 0;
    }

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(type => Encontro, encontro => encontro.partidas)
    encontro: Encontro;

    @OneToMany(type=> PartidaGol, partidaGol => partidaGol.partida)
    partidaGols: PartidaGol[];

    @OneToMany(type=> PartidaTime, partidaTime => partidaTime.partida)
    partidaTimes: PartidaTime[];

    toJson():string{
        return `{
            "id": ${this.id},
        }`
    }
}