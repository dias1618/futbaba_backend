import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Jogador } from "./jogador.entity";
import { Partida } from "./partida.entity";
import { Time } from "./time.entity";

@Entity()
export class Encontro extends BaseEntity{

    
    constructor(data?: {id?:number, dtEncontro?:Date, nmVencedor:string, nmArtilheiro:string}){
        super();
        this.id = data && data.id || 0;
        this.dtEncontro = data && data.dtEncontro || null;
        this.nmVencedor = data && data.nmVencedor || null;
        this.nmArtilheiro = data && data.nmArtilheiro || null;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: '2021-09-30', description: 'Data do Encontro' })
    @Column("timestamp without time zone", {nullable: true})
    dtEncontro:Date;
    
    @ApiProperty({ example: 3, description: 'Nome do time vencedor no encontro' })
    @Column("character varying", {nullable: true})
    nmVencedor:string;
    
    @ApiProperty({ example: '4', description: 'Nome do jogador que fez mais gols no encontro' })
    @Column("character varying", {nullable: true})
    nmArtilheiro:string;

    @OneToMany(type=> Time, time => time.encontro)
    times: Time[];

    @OneToMany(type=> Partida, partida => partida.encontro)
    partidas: Partida[];

    @OneToMany(type=> Jogador, jogador => jogador.encontro)
    jogadores: Jogador[];

}