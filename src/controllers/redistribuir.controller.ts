import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JogadoresNaoDistribuidos } from "src/dtos/jogadores-nao-distribuidos.dto";
import { TimeJogador } from "src/entities/time-jogador.entity";
import { RedistribuicaoService } from "src/services/redistribuicao/redistribuicao.service";

@ApiTags('redistribuicao')
@Controller('redistribuicao')
export class RedistribuirController {
  
  constructor(
    private readonly _redistribuicaoService: RedistribuicaoService,
  ) {}
 
  @Post('')
  @ApiOperation({ summary: 'Faz a redistribuição dos jogadores nos times' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum encontro encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: TimeJogador,})
  async redistribuir(@Body() jogadoresNaoDistribuidos:JogadoresNaoDistribuidos) {
    console.log('jogadoresNaoDistribuidos.jogadores = ', jogadoresNaoDistribuidos.jogadores)
    console.log('jogadoresNaoDistribuidos.times = ', jogadoresNaoDistribuidos.times)
    return await this._redistribuicaoService.redistribuir(jogadoresNaoDistribuidos.jogadores, jogadoresNaoDistribuidos.times);
  }
 
}