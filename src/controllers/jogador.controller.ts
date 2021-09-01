import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Jogador } from "src/entities/jogador.entity";
import { JogadorService } from "src/services/jogador/jogador.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('jogadores')
@Controller('jogadores')
export class JogadorController {
  
  constructor(
    private readonly _jogadorService: JogadorService,
  ) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Insere um jogador no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Inserção realizada com sucesso.', type: Jogador,})
  async insert(@Body() jogador: Jogador) {
    return await this._jogadorService.insert(jogador);
  }
  
  @Put('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um jogador no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Atualização realizada com sucesso.', type: Jogador,})
  async update(@Body() jogador: Jogador) {
    return await this._jogadorService.update(jogador);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Busca um jogador no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Jogador,})
  async get(@Param('id') id: number) {
    return await this._jogadorService.get(id);
  }
  
  @Get('')
  @ApiOperation({ summary: 'Busca todos os jogadores no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum jogador encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Jogador,})
  async getAll() {
    return await this._jogadorService.getAll();
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um jogador do sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Jogador não encontrado.' })
  @ApiResponse({ status: 403, description: 'Jogador não pode ser deletado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Jogador,})
  async delete(@Param('id') id: number) {
    return await this._jogadorService.delete(id);
  }
  
}