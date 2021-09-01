import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Encontro } from './entities/encontro.entity';
import { Jogador } from './entities/jogador.entity';
import { PartidaGol } from './entities/partida-gol.entity';
import { PartidaTime } from './entities/partida-time.entity';
import { Partida } from './entities/partida.entity';
import { TimeJogador } from './entities/time-jogador.entity';
import { Time } from './entities/time.entity';

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
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
