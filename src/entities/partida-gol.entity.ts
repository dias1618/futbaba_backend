import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Jogador } from "./jogador.entity";
import { Partida } from "./partida.entity";

@Entity()
export class PartidaGol extends BaseEntity{

    constructor(data?: {id?:number}){
        super();
        this.id = data && data.id || 0;
    }

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(type => Partida, partida => partida.partidaGols)
    partida: Partida;
   
    @ManyToOne(type => Jogador, jogador => jogador.partidaGols)
    jogador: Jogador;

    toJson():string{
        return `{
            "id": ${this.id},
        }`
    }
}