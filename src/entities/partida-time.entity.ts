import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Time } from "./time.entity";
import { Partida } from "./partida.entity";

@Entity()
export class PartidaTime extends BaseEntity{

    constructor(data?: {id?:number}){
        super();
        this.id = data && data.id || 0;
    }

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(type => Partida, partida => partida.partidaTimes)
    partida: Partida;
   
    @ManyToOne(type => Time, time => time.partidaTimes)
    time: Time;

    toJson():string{
        return `{
            "id": ${this.id},
        }`
    }
}