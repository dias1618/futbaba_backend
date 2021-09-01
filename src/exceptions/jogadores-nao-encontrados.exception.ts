import { HttpException, HttpStatus } from "@nestjs/common";

export class JogadoresNaoEncontradosException extends HttpException {
    constructor() {
      super('Nenhum jogador encontrado', HttpStatus.NO_CONTENT);
    }
  }