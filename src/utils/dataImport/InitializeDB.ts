import CapitalChallengeDB from "src/db/CapitalChallengeDB";
import { CountryCapitalList } from "./AllCountry";

import type { TQuestObj } from "src/types/TQuest";

const capitalChallengeDB = new CapitalChallengeDB();

const run = async(object: TQuestObj) => {
  await capitalChallengeDB.insertSingleContry(object);
}

Object.keys(CountryCapitalList).forEach((country) => {
  const object: TQuestObj = {
    country: country,
    capital: CountryCapitalList[country],
  }
  run(object);
});

export default capitalChallengeDB;