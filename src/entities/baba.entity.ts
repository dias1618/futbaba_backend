import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Encontro } from "./encontro.entity";

@Entity()
export class Baba extends BaseEntity{

    
    constructor(data?: {id?:number, nmBaba:string}){
        super();
        this.id = data && data.id || 0;
        this.nmBaba = data && data.nmBaba || null;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: 3, description: 'Nome do baba' })
    @Column("character varying", {nullable: true})
    nmBaba:string;
    
    @OneToMany(type=> Encontro, encontro => encontro.baba)
    encontros: Encontro[];

}