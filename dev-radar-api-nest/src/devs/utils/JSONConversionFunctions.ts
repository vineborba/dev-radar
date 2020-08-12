import { Dev } from '../devs.model';
import { GithubDevInfo, Point } from '../devs.model'
import converStringToStringArray from './convertStringToStringArray';

export const convertDevToJSON = (dev: Dev) => ({
  devId: dev.id,
  githubUsername: dev.githubUsername,
  name: dev.name,
  avatarUrl: dev.avatarUrl,
  bio: dev.bio,
  techs: dev.techs,
  location: dev.location,
});

export const converNewDevToDbJSON = (
  githubUsername: string, devInfo: GithubDevInfo, techs: string, location: Point,
) => ({
  githubUsername,
  name: devInfo.name || devInfo.login,
  avatarUrl: devInfo.avatar_url,
  bio: devInfo.bio,
  techs: converStringToStringArray(techs),
  location
});
