import { Time } from "src/entities/time.entity";

export const TIME_REPOSITORY = 'TIME REPOSITORY';

export interface TimeRepository{
    insert(time:Time):Promise<Time>;
    update(time:Time):Promise<Time>;
    get(id:number):Promise<Time>;
    getAll():Promise<Time[]>;
    delete(id:number):Promise<Time>;
}


