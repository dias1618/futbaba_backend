import { HttpException, HttpStatus } from "@nestjs/common";

export class EncontrosNaoEncontradosException extends HttpException {
    constructor() {
      super('Nenhum encontro encontrado', HttpStatus.NO_CONTENT);
    }
  }