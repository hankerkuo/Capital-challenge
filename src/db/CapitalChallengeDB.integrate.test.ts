import CapitalChallengeDB from "./CapitalChallengeDB";

test("Test get all countries with capitals", async() => {
  const capitalChallengeDB = new CapitalChallengeDB();
  const resultArray = await capitalChallengeDB.getAllCountryCapital();
  expect(resultArray).not.toBeNull();
  expect(resultArray?.length).toBeGreaterThan(0);
});
