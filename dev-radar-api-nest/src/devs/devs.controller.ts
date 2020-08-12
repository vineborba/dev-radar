import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpService,
} from '@nestjs/common';
import { DevsService } from './devs.service'
import { converNewDevToDbJSON, convertDevToJSON } from './utils/JSONConversionFunctions';
import convertStringToStringArray from './utils/convertStringToStringArray';
import { Dev } from './devs.model';

@Controller('devs')
export class DevsController {
  constructor(
    private readonly devService: DevsService,
    private readonly httpService: HttpService,
  ) { }

  @Post('register')
  async registerDev(
    @Body('githubUsername') githubUsername: string,
    @Body('techs') techs: string,
    @Body('longitude') longitude: number,
    @Body('latitude') latitude: number,
  ) {
    const user = await this.devService.findDevByGithubUsername(githubUsername);

    if (!user) {
      const url = `http://api.github.com/users/${githubUsername}`;

      const devInfo = await this.httpService.get(url).toPromise().then(res => res.data);

      const location = {
        type: 'Point',
        coordinates: [
          longitude,
          latitude,
        ],
      };

      const newDev = converNewDevToDbJSON(githubUsername, devInfo, techs, location);

      return this.devService.createDev(newDev)
        .then((dev: Dev) => convertDevToJSON(dev));
    }

    return { message: 'Dev already registered' }
  }

  @Get()
  async listAllDevs() {
    const devs = await this.devService.findAllDevs();

    return devs.map((dev: Dev) => convertDevToJSON(dev));
  }

  @Get('/search')
  async listDevsByLocationAndTechs(
    @Query('techs') techsString: string,
    @Query('latitute') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    const techs = convertStringToStringArray(techsString);
    const devs = await this.devService.findDevsByLocationAndTechs(techs, latitude, longitude)

    return devs.map((dev: Dev) => convertDevToJSON(dev));
  }
}