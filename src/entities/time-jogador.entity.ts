import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Jogador } from "./jogador.entity";
import { Time } from "./time.entity";

@Entity()
export class TimeJogador extends BaseEntity{

    constructor(data?: {id?:number}){
        super();
        this.id = data && data.id || 0;
    }

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(type => Time, time => time.timeJogadores)
    time: Time;

    @ManyToOne(type => Jogador, jogador => jogador.timeJogadores)
    jogador: Jogador;


    toJson():string{
        return `{
            "id": ${this.id},
        }`
    }
}