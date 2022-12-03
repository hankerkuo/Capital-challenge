import DatabaseConnect from "src/utils/DatabaseConnect";

import type { TQuestObj } from "src/types/TQuest";

export default class CapitalChallengeDB extends DatabaseConnect {

  async getAllCountryCapital() {
    let result = null;
    try {
      result = await this.prismaClient.worldCapitals.findMany();
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  async insertSingleContry(object: TQuestObj) {
    const insertResult = await this.prismaClient.worldCapitals.create({
      data: {
        country: object.country,
        capital: object.capital,
      }
    })
    return insertResult;
  }

  async dropCollection() {
    await this.prismaClient.worldCapitals.deleteMany();
  }
  
}

