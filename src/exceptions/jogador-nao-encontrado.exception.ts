import { HttpException, HttpStatus } from "@nestjs/common";

export class JogadorNaoEncontradoException extends HttpException {
    constructor() {
      super('Jogador não encontrado', HttpStatus.NOT_FOUND);
    }
  }