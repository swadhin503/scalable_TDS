import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';
import { singleUserQuery } from '../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST' && req?.query?.role) {
    try {
      const userInfo = req.body;
      const isExist = await client.fetch(singleUserQuery(userInfo?._id));
      if (isExist?.length) {
        return res.status(200).json({ message: 'ok', data: isExist[0] });
      }
      const response = await client.createOrReplace(userInfo);

      res.status(200).json({ message: 'ok', data: response });
    } catch (error) {
      // console.log(error);

      res.status(200).json({ message: 'error' });
    }
  }

  res.status(500).json({ message: 'ok' });
}
