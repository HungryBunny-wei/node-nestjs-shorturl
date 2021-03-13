import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from '../entities/short-url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
  controllers: [ShortUrlController]
})
export class ShortUrlModule {
}
