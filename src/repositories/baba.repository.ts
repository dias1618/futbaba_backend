import { Baba } from "src/entities/baba.entity";
import { Encontro } from "src/entities/encontro.entity";

export const BABA_REPOSITORY = 'BABA REPOSITORY';

export interface BabaRepository{
    insert(baba:Baba):Promise<Baba>;
    update(baba:Baba):Promise<Baba>;
    get(id:number):Promise<Baba>;
    getAll():Promise<Baba[]>;
    delete(id:number):Promise<Baba>;
    getEncontros(id:number):Promise<Array<Encontro>>;
}


