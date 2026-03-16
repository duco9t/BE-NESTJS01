import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { User } from "./user/entity/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        type: "postgres",
        host: ConfigService.get("DB_HOST"),
        port: ConfigService.get("DB_PORT"),
        username: ConfigService.get("DB_USERNAME"),
        password: ConfigService.get("DB_PASSWORD"),
        database: ConfigService.get("DB_DATABASE"),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
