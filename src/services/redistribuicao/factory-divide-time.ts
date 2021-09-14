import { DivideTime } from "./divide-time";
import { DivideTimeConstructor } from "./divide-time-constructor";

export function newDivideTime(divideTimeConstructor:DivideTimeConstructor, proximaDivisao?:DivideTime){
    return new divideTimeConstructor(proximaDivisao);
}