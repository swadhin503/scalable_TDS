import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { client } from '../../utils/client';
import { singleUserQuery } from '../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const info = await getSession({ req });
    const { role } = req.query;
    //@ts-ignore
    const userInfo = {
      _id: info?._id!,
      _type: 'user',
      userName: info?.userName!,
      image: info?.iamge!,
      role,
    };
    const isExist = await client.fetch(singleUserQuery(info?._id));
    if (isExist?.length) {
      return res.status(200).json({ message: 'ok', data: isExist[0] });
    }
    const response = await client.createOrReplace(userInfo);

    res.status(200).json({ message: 'ok', data: response });
  } catch (error) {
    // console.log(error);

    res.status(200).json({ message: 'error' });
  }

  res.status(200).json({ message: 'ok' });
}
