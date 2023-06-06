// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';

import CountryCapitalAPI from 'src/service/CountryCapitalAPI.service';
import Logger from 'src/utils/Logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    Logger.log('[image-tagging]', 'Block anonymous user');
    return res.status(401).json({
      error: 'You must be signed in to access the resource.',
    });
  }
  // TODO: make the admin user list in the database
  if (!session.user || session.user.email !== 'hankerkuo@gmail.com') {
    Logger.log(
      '[image-tagging]',
      'Block unauthorized user:',
      session?.user?.email
    );
    return res.status(403).json({
      error: "You don't have privilege to access the resource.",
    });
  }
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
