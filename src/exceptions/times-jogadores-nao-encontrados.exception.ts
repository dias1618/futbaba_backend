import { HttpException, HttpStatus } from "@nestjs/common";

export class TimesJogadoresNaoEncontradosException extends HttpException {
    constructor() {
      super('Nenhuma relação de time e jogador encontrada', HttpStatus.NO_CONTENT);
    }
  }