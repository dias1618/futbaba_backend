import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Baba } from "src/entities/baba.entity";
import { BabaService } from "src/services/baba/baba.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('babas')
@Controller('babas')
export class BabaController {
  
  constructor(
    private readonly _babaService: BabaService
  ) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Insere um baba no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Inserção realizada com sucesso.', type: Baba,})
  async insert(@Body() baba: Baba) {
    return await this._babaService.insert(baba);
  }
  
  @Put('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um baba no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Atualização realizada com sucesso.', type: Baba,})
  async update(@Body() baba: Baba) {
    return await this._babaService.update(baba);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Busca um baba no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Baba não encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Baba,})
  async get(@Param('id') id: number) {
    return await this._babaService.get(id);
  }
  
  @Get('')
  @ApiOperation({ summary: 'Busca todos os babas no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum baba encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Baba,})
  async getAll() {
    return await this._babaService.getAll();
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um baba do sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Baba não encontrado.' })
  @ApiResponse({ status: 403, description: 'Baba não pode ser deletado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Baba,})
  async delete(@Param('id') id: number) {
    return await this._babaService.delete(id);
  }
  
  @Get(':id/encontros')
  @ApiOperation({ summary: 'Busca todas encontros de um baba' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum encontro encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Baba,})
  async getEncontros(@Param('id') id:number) {
    return await this._babaService.getEncontros(id);
  }
   
}