import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dev, DevInfo } from './devs.model';

@Injectable()
export class DevsService {
  constructor(
    @InjectModel('devs') private readonly devModel: Model<Dev>,
  ) { }

  async createDev(newDevToCreate: DevInfo) {
    const newDev = new this.devModel(newDevToCreate);
    return newDev.save();
  }

  async findAllDevs() {
    return this.devModel.find().exec();
  }

  async findDevByGithubUsername(githubUsername: string) {
    return this.devModel.findOne({ githubUsername }).exec();
  }

  async findDevsByLocationAndTechs(techs: string[], latitude: number, longitude: number) {
    return this.devModel.find({
      techs: {
        $in: techs,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    }).exec();
  }
}
