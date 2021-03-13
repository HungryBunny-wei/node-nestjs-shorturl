import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShortUrlModule } from "./short-url/short-url.module";

@Module({
  imports: [TypeOrmModule.forRoot(), ShortUrlModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
