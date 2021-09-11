import { HttpException, HttpStatus } from "@nestjs/common";

export class PartidaNaoEncontradoException extends HttpException {
    constructor() {
      super('Partida não encontrado', HttpStatus.NOT_FOUND);
    }
  }