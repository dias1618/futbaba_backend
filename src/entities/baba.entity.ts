import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Encontro } from "./encontro.entity";

@Entity()
export class Baba extends BaseEntity{

    
    constructor(data?: {id?:number, dtBaba?:Date, nmBaba:string}){
        super();
        this.id = data && data.id || 0;
        this.dtBaba = data && data.dtBaba || null;
        this.nmBaba = data && data.nmBaba || null;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({ example: '2021-09-30', description: 'Data do Baba' })
    @Column("timestamp without time zone", {nullable: true})
    dtBaba:Date;
    
    @ApiProperty({ example: 3, description: 'Nome do baba' })
    @Column("character varying", {nullable: true})
    nmBaba:string;
    
    @OneToMany(type=> Encontro, encontro => encontro.baba)
    encontros: Encontro[];

}