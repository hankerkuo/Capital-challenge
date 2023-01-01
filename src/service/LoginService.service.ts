import { UseAspect, Advice } from 'ts-aspect';

import CapitalChallengeDB from 'src/db/CapitalChallengeDB'
import LoggingAspect from 'src/aop/LoggingAspect.aop';

import Logger from 'src/utils/Logger';

import type { NextApiRequest, NextApiResponse } from 'next'

interface ILoginService {
  getAuthenticatedUserName: (body: NextApiRequest["body"]) => string;
}

export default class LoginService implements ILoginService{
  //TODO: do the real authetication here
  @UseAspect(Advice.Before, LoggingAspect)
  public getAuthenticatedUserName(body: NextApiRequest["body"]) {
    if(!body.account) {
      Logger.error('account not found');
      throw new Error('account not found');
    }
    Logger.log('get authenticated user name', body.account);
    return `${body.account}`;
  }
}