// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import CountryCapitalAPI from 'src/service/CountryCapitalAPI.service';
import Logger from 'src/utils/Logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  Logger.log('req.body', body.country);
  const countryCapitalAPI = new CountryCapitalAPI();
  const result = await countryCapitalAPI.updateCountry(body.country, {
    YXAxisOnMap: [body.y, body.x],
  });
  if (result === null) {
    return res.status(500).json({
      error: 'Failed to update the country.',
    });
  }
  return res.status(200).json(result);
}
