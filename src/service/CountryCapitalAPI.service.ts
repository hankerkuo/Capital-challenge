import { UseAspect, Advice } from 'ts-aspect';

import CapitalChallengeDB from 'src/db/CapitalChallengeDB';
import LoggingAspect from 'src/aop/LoggingAspect.aop';

import type { TCountryCapitalFromDb } from 'src/db/CapitalChallengeDB';
import { WorldCapitals } from '@prisma/client';

interface ICountryCapitalAPI {
  fetchAllCountryCapital: () => TCountryCapitalFromDb;
  updateCountry: (
    country: string,
    updatedData: Record<string, any>
  ) => Promise<WorldCapitals | null>;
}

export default class CountryCapitalAPI implements ICountryCapitalAPI {
  @UseAspect(Advice.Before, LoggingAspect)
  public async fetchAllCountryCapital() {
    const capitalChallengeDb = new CapitalChallengeDB();
    const result = await capitalChallengeDb.getAllCountryCapital();
    return result;
  }

  @UseAspect(Advice.Before, LoggingAspect)
  public async updateCountry(country: string, updatedData: Record<string, any>) {
    const capitalChallengeDb = new CapitalChallengeDB();
    const result = await capitalChallengeDb.updateCountry(country, updatedData);
    return result;
  }
}
