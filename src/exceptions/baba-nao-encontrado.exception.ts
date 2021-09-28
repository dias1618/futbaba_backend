import { HttpException, HttpStatus } from "@nestjs/common";

export class BabaNaoEncontradoException extends HttpException {
    constructor() {
      super('Baba não encontrado', HttpStatus.NOT_FOUND);
    }
  }