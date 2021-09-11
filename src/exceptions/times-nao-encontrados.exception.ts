import { HttpException, HttpStatus } from "@nestjs/common";

export class TimesNaoEncontradosException extends HttpException {
    constructor() {
      super('Nenhum time encontrado', HttpStatus.NO_CONTENT);
    }
  }