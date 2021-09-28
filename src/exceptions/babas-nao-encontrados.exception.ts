import { HttpException, HttpStatus } from "@nestjs/common";

export class BabasNaoEncontradosException extends HttpException {
    constructor() {
      super('Nenhum baba encontrado', HttpStatus.NO_CONTENT);
    }
  }