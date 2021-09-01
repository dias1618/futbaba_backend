import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PartidaGol } from "./partida-gol.entity";
import { TimeJogador } from "./time-jogador.entity";

@Entity()
export class Jogador extends BaseEntity{

    
    constructor(data?: {id?:number, nmJogador?:string, tpPosicao:number, qtEstrelas:number}){
        super();
        this.id = data && data.id || 0;
        this.nmJogador = data && data.nmJogador || null;
        this.tpPosicao = data && data.tpPosicao || null;
        this.qtEstrelas = data && data.qtEstrelas || null;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: 'Marcos', description: 'O nome do jogador' })
    @Column("character varying", {nullable: true})
    nmJogador:string;
    
    @ApiProperty({ enum: [
        {1:'Goleiro'},
        {2:'Zagueiro'},
        {3:'Meia'},
        {4:'Atacante'},
    ], example: 3, description: 'A posição em que o jogador atua' })
    @Column("smallint", {nullable: true})
    tpPosicao:number;
    
    @ApiProperty({ example: 4, description: 'Indicam o nível do jogador de 1 a 5' })
    @Column("smallint", {nullable: true})
    qtEstrelas:number;

    @OneToMany(type=> TimeJogador, timeJogador => timeJogador.jogador)
    timeJogadores: TimeJogador[];

    @OneToMany(type=> PartidaGol, partidaGol => partidaGol.jogador)
    partidaGols: PartidaGol[];

}