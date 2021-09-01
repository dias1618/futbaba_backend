import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Encontro } from "./encontro.entity";
import { PartidaTime } from "./partida-time.entity";
import { TimeJogador } from "./time-jogador.entity";

@Entity()
export class Time extends BaseEntity{

    
    constructor(data?: {id?:number, nmTime?:string}){
        super();
        this.id = data && data.id || 0;
        this.nmTime = data && data.nmTime || null;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: 'Vermelho', description: 'Nome do time' })
    @Column("character varying", {nullable: true})
    nmTime:string;
    
    @ManyToOne(type => Encontro, encontro => encontro.times)
    encontro: Encontro;

    @OneToMany(type=> TimeJogador, timeJogador => timeJogador.time)
    timeJogadores: TimeJogador[];

    @OneToMany(type=> PartidaTime, partidaTime => partidaTime.time)
    partidaTimes: PartidaTime[];

}