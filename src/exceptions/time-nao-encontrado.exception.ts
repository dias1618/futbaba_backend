import { HttpException, HttpStatus } from "@nestjs/common";

export class TimeNaoEncontradoException extends HttpException {
    constructor() {
      super('Time não encontrado', HttpStatus.NOT_FOUND);
    }
  }