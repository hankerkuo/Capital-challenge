import { UseAspect, Advice } from 'ts-aspect';

import CapitalChallengeDB from 'src/db/CapitalChallengeDB'
import LoggingAspect from 'src/aop/LoggingAspect.aop';

import type { TCountryCapitalFromDb } from 'src/db/CapitalChallengeDB';

interface ICountryCapitalAPI {
  fetchAllCountryCapital: () => TCountryCapitalFromDb;
}

export default class CountryCapitalAPI implements ICountryCapitalAPI{
  @UseAspect(Advice.Before, LoggingAspect)
  public async fetchAllCountryCapital() {
    const capitalChallengeDb = new CapitalChallengeDB();
    const result = await capitalChallengeDb.getAllCountryCapital();
    return result;
  }
}