import { HttpException, HttpStatus } from "@nestjs/common";

export class EncontroNaoEncontradoException extends HttpException {
    constructor() {
      super('Encontro não encontrado', HttpStatus.NOT_FOUND);
    }
  }