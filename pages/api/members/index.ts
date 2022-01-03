import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { getMembersDataWithPages } from '@/db/queries/form-data.queries';
import { TableData } from '@/lib/lib.types';
import { middlwares } from '@/middlware/index.middlware';

const Columns = [
  { field: 'id', header: 'ID' },
  { field: 'fullId', header: 'ID Complet' },
  { field: 'name', header: 'Nom' },
  { field: 'email', header: 'Email' },
  { field: 'formation', header: 'Formation' },
  { field: 'studyLevel', header: "Niveau d'étude" },
  { field: 'status', header: 'Statut' },
  { field: 'school', header: 'Ecole' },
  { field: 'joined', header: 'À adhéré' },
  { field: 'adhesionDate', header: "Date d'adhésion" },
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
