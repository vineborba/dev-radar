import * as mongoose from 'mongoose';
import PointSchema from './utils/PointSchema'

export interface Point {
  type: string,
  coordinates: number[],
}

export const DevSchema = new mongoose.Schema({
  name: { type: String, required: true },
  githubUsername: { type: String, required: true },
  bio: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  techs: { type: [String], required: true },
  location: { type: PointSchema, required: true }
});

export interface Dev extends mongoose.Document {
  id: string;
  name: string;
  githubUsername: string;
  bio: string;
  avatarUrl: string;
  techs: string[];
  location: Point,
}

export interface DevInfo {
  githubUsername: string,
  avatarUrl: string,
  techs: string[],
  name: string,
  bio: string,
}

export interface GithubDevInfo {
  name: string,
  login: string,
  avatar_url: string,
  bio: string,
}