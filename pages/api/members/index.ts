import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { getMembersDataWithPages } from '../../../lib/db/queries/form-data.queries';
import type { TableData } from '../../../lib/lib.types';
import { middlwares } from '../../../middleware/index.middlware';

const Columns = [
  'id',
  'fullId',
  'name',
  'email',
  'formation',
  'studyLevel',
  'status',
  'school',
];

interface ErrorData {
  error: string;
}

interface SuccessData {
  message: string;
}

interface NextReqWithQuery extends NextApiRequest {
  query: {
    page: string;
    limit: string;
  };
}

const handler = nc().use(middlwares);

handler.get(
  async (
    req: NextReqWithQuery,
    res: NextApiResponse<TableData | SuccessData | ErrorData>,
  ) => {
    let { page = 0, limit = 0 } = req.query;
    try {
      // check if page and limit are numbers
      if (Number.isNaN(Number(page)) || Number.isNaN(Number(limit))) {
        [page, limit] = [0, 0];
      }
      // eslint-disable-next-line no-console
      const { data, count } = await getMembersDataWithPages(
        Number(page),
        Number(limit),
      );

      res.status(200).json({ data, count, columns: Columns });
    } catch (err) {
      res.status(400).json({ error: (<Error>err).message });
    }
  },
);

export default handler;
