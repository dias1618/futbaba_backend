import { HttpException, HttpStatus } from "@nestjs/common";

export class PartidasNaoEncontradosException extends HttpException {
    constructor() {
      super('Nenhuma partida encontrado', HttpStatus.NO_CONTENT);
    }
  }