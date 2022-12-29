// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import callMeToDelay from 'src/utils/FakeDelay';
import CountryCapitalAPI from 'src/service/CountryCapitalAPI.service';

// TODO: add more flexibility of getting amounts of country-capital entries
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const countryCapitalAPI = new CountryCapitalAPI();
  const result = await countryCapitalAPI.fetchAllCountryCapital();
  // console.log(result);
  // await callMeToDelay(2000);
  res.status(200).json(result);
}
