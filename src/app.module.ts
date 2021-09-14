import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogadorController } from './controllers/jogador.controller';
import { EncontroController } from './controllers/encontro.controller';
import { PartidaController } from './controllers/partida.controller';
import { TimeController } from './controllers/time.controller';
import { Encontro } from './entities/encontro.entity';
import { Jogador } from './entities/jogador.entity';
import { PartidaGol } from './entities/partida-gol.entity';
import { PartidaTime } from './entities/partida-time.entity';
import { Partida } from './entities/partida.entity';
import { TimeJogador } from './entities/time-jogador.entity';
import { Time } from './entities/time.entity';
import { JOGADOR_REPOSITORY } from './repositories/jogador.repository';
import { JogadorTypeorm } from './repositories/typeorm/jogador.typeorm';
import { JogadorService } from './services/jogador/jogador.service';
import { ENCONTRO_REPOSITORY } from './repositories/encontro.repository';
import { EncontroTypeorm } from './repositories/typeorm/encontro.typeorm';
import { EncontroService } from './services/encontro/encontro.service';
import { PARTIDA_REPOSITORY } from './repositories/partida.repository';
import { PartidaTypeorm } from './repositories/typeorm/partida.typeorm';
import { PartidaService } from './services/partida/partida.service';
import { TIME_REPOSITORY } from './repositories/time.repository';
import { TimeTypeorm } from './repositories/typeorm/time.typeorm';
import { TimeService } from './services/time/time.service';
import { TimeJogadorService } from './services/time-jogador/time-jogador.service';
import { TimeJogadorTypeorm } from './repositories/typeorm/time-jogador.typeorm';
import { TIME_JOGADOR_REPOSITORY } from './repositories/time-jogador.repository';
import { RedistribuicaoService } from './services/redistribuicao/redistribuicao.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: new Number(process.env.DATABASE_PORT).valueOf(),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Encontro,
        Jogador,
        PartidaGol,
        PartidaTime,
        Partida,
        TimeJogador,
        Time
      ],
      synchronize: true,
      //logging: true
    }),
  ],
  controllers: [
    JogadorController,
    EncontroController,
    PartidaController,
    TimeController,
  ],
  providers: [
    JogadorService,
    {
      useClass: JogadorTypeorm,
      provide: JOGADOR_REPOSITORY
    },
    EncontroService,
    {
      useClass: EncontroTypeorm,
      provide: ENCONTRO_REPOSITORY
    },
    PartidaService,
    {
      useClass: PartidaTypeorm,
      provide: PARTIDA_REPOSITORY
    },
    TimeService,
    {
      useClass: TimeTypeorm,
      provide: TIME_REPOSITORY
    },
    TimeJogadorService,
    {
      useClass: TimeJogadorTypeorm,
      provide: TIME_JOGADOR_REPOSITORY
    },
    RedistribuicaoService,
    
  ],
})
export class AppModule {}
