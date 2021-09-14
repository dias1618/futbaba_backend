import { Time } from "src/entities/time.entity";
import { DivideTime } from "./divide-time";

export interface DivideTimeConstructor{
    new(proximaDivisao?:DivideTime):DivideTime;
}