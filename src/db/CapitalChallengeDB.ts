import { WorldCapitals } from '@prisma/client';

import { UseAspect, Advice } from 'ts-aspect';
import LoggingAspect from 'src/aop/LoggingAspect.aop';
import DatabaseConnect from "src/utils/DatabaseConnect";
import type { TQuestObj } from "src/types/TQuest";
import Logger from 'src/utils/Logger';

export type TCountryCapitalFromDb = Promise<WorldCapitals[] | null>;

export default class CapitalChallengeDB extends DatabaseConnect {

  @UseAspect(Advice.Before, LoggingAspect)
  async getAllCountryCapital(): TCountryCapitalFromDb {
    let result = null;
    try {
      result = await this.prismaClient.worldCapitals.findMany();
    } catch (err) {
      Logger.error(err);
    }
    return result;
  }

  @UseAspect(Advice.Before, LoggingAspect)
  async insertSingleContry(object: TQuestObj): Promise<WorldCapitals> {
    const insertResult = await this.prismaClient.worldCapitals.create({
      data: {
        country: object.country,
        capital: object.capital,
      }
    })
    return insertResult;
  }

  @UseAspect(Advice.Before, LoggingAspect)
  async dropCollection(): Promise<void> {
    try {
      await this.prismaClient.worldCapitals.deleteMany();
    } catch(e) {
      console.error(e);
      throw 'Error while deleting whole collection';
    }
  }
  
}

