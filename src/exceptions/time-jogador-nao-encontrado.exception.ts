import { HttpException, HttpStatus } from "@nestjs/common";

export class TimeJogadorNaoEncontradoException extends HttpException {
    constructor() {
      super('Relação de Time e Jogador não encontrada', HttpStatus.NOT_FOUND);
    }
  }