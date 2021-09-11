import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Time } from "src/entities/time.entity";
import { TimeService } from "src/services/time/time.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('times')
@Controller('times')
export class TimeController {
  
  constructor(
    private readonly _timeService: TimeService,
  ) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Insere um time no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Inserção realizada com sucesso.', type: Time,})
  async insert(@Body() time: Time) {
    return await this._timeService.insert(time);
  }
  
  @Put('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um time no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 200, description: 'Atualização realizada com sucesso.', type: Time,})
  async update(@Body() time: Time) {
    return await this._timeService.update(time);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Busca um time no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Time não encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Time,})
  async get(@Param('id') id: number) {
    return await this._timeService.get(id);
  }
  
  @Get('')
  @ApiOperation({ summary: 'Busca todos os times no sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 204, description: 'Nenhum time encontrado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Time,})
  async getAll() {
    return await this._timeService.getAll();
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um time do sistema' })
  @ApiResponse({ status: 401, description: 'Autorização não identificada para a operação.' })
  @ApiResponse({ status: 404, description: 'Time não encontrado.' })
  @ApiResponse({ status: 403, description: 'Time não pode ser deletado.' })
  @ApiResponse({ status: 200, description: 'Busca realizada com sucesso.', type: Time,})
  async delete(@Param('id') id: number) {
    return await this._timeService.delete(id);
  }
  
}