// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { middlwares } from '../../middleware/index.middlware';

type Data = {
  name: string;
};
const handler = nc()
  .use(middlwares)
  .get((req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({ name: 'John Doe' });
  });

export default handler;
