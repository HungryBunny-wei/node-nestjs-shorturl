import { Body, Controller, Get, Param, Post, Redirect, Req, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortUrlEntity } from '../entities/short-url.entity';
import { Repository } from 'typeorm';
import * as shortid from 'shortid';
import * as validUrl from 'valid-url';
import { Config } from '../config';

@Controller('/')
export class ShortUrlController {
  constructor(@InjectRepository(ShortUrlEntity)
              private shortUrlRepository: Repository<ShortUrlEntity>) {
  }

  @Post('shortLinks')
  async shortLinks(@Body() body: { link: string }, @Res() res: Response) {
    console.log('body', body);
    if (!body.link) {
      res.status(400).json({ error: { message: '"link" not null' } });
      return;
    }
    const link = encodeURI(body.link);
    if (!validUrl.isUri(link)) {
      res.status(400).json({ error: { message: '"link" It\'s not a legal address'} });
    }
    const shortUrlEntity = await this.shortUrlRepository.findOne({ link });
    if (shortUrlEntity) {
      res.status(200).json({ shortLink: `${Config.shortUrlPrefix}/${shortUrlEntity.urlCode}` });
    } else {
      const urlCode = shortid.generate();
      await this.shortUrlRepository.save({ link, urlCode });
      res.status(200).json({ shortLink: `${Config.shortUrlPrefix}/${urlCode}` });
    }

  }

  @Get('s/:urlCode')
  async redirect(@Param('urlCode') urlCode: string, @Res() res: Response) {
    const shortUrlEntity = await this.shortUrlRepository.findOne({ urlCode });
    if (shortUrlEntity) {
      res.redirect(decodeURI(shortUrlEntity.link));
    } else {
      res.send('404');
    }
  }
}
