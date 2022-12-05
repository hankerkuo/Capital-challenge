// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import CapitalChallengeDB from 'src/db/CapitalChallengeDB'

// TODO: add more flexibility of getting amounts of country-capital entries
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const capitalChallengeDb = new CapitalChallengeDB();
  const result = await capitalChallengeDb.getAllCountryCapital();
  console.log(result);
  res.status(200).json(result);
}
