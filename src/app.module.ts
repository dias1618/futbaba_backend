import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogadorController } from './controllers/jogador.controller';
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
  ],
  providers: [
    JogadorService,
    {
      useClass: JogadorTypeorm,
      provide: JOGADOR_REPOSITORY
    },
    
  ],
})
export class AppModule {}
