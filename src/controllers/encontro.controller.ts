import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Encontro } from "src/entities/encontro.entity";
import { EncontroService } from "src/services/encontro/encontro.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('encontros')
@Controller('encontros')
export class EncontroController {
  
  constructor(
    private readonly _encontroService: EncontroService,
  ) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Insere um encontro no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Inserção realizada com sucesso.', type: Encontro,})
  async insert(@Body() encontro: Encontro) {
    return await this._encontroService.insert(encontro);
  }
  
  @Put('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um encontro no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Atualização realizada com sucesso.', type: Encontro,})
  async update(@Body() encontro: Encontro) {
    return await this._encontroService.update(encontro);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Busca um encontro no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Encontro não encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Encontro,})
  async get(@Param('id') id: number) {
    return await this._encontroService.get(id);
  }
  
  @Get('')
  @ApiOperation({ summary: 'Busca todos os encontros no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum encontro encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Encontro,})
  async getAll() {
    return await this._encontroService.getAll();
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um encontro do sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Encontro não encontrado.' })
  @ApiResponse({ status: 403, description: 'Encontro não pode ser deletado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Encontro,})
  async delete(@Param('id') id: number) {
    return await this._encontroService.delete(id);
  }
  
  @Get(':id/partidas')
  @ApiOperation({ summary: 'Busca todas partidas de um encontro' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum encontro encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Encontro,})
  async getPartidas(@Param('id') id:number) {
    return await this._encontroService.getPartidas(id);
  }
  
  @Get(':id/times')
  @ApiOperation({ summary: 'Busca todos times de um encontro' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum encontro encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Encontro,})
  async getTimes(@Param('id') id:number) {
    return await this._encontroService.getTimes(id);
  }
  
}