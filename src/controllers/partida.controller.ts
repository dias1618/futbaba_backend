import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Partida } from "src/entities/partida.entity";
import { PartidaService } from "src/services/partida/partida.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('partidas')
@Controller('partidas')
export class PartidaController {
  
  constructor(
    private readonly _partidaService: PartidaService,
  ) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Insere um partida no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Inserção realizada com sucesso.', type: Partida,})
  async insert(@Body() partida: Partida) {
    return await this._partidaService.insert(partida);
  }
  
  @Put('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um partida no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Atualização realizada com sucesso.', type: Partida,})
  async update(@Body() partida: Partida) {
    return await this._partidaService.update(partida);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Busca um partida no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Partida não encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Partida,})
  async get(@Param('id') id: number) {
    return await this._partidaService.get(id);
  }
  
  @Get('')
  @ApiOperation({ summary: 'Busca todos os partidas no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum partida encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Partida,})
  async getAll() {
    return await this._partidaService.getAll();
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um partida do sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Partida não encontrado.' })
  @ApiResponse({ status: 403, description: 'Partida não pode ser deletado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Partida,})
  async delete(@Param('id') id: number) {
    return await this._partidaService.delete(id);
  }
  
}