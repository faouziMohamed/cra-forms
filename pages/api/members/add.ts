import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import {
  createMemberData,
  existsMember,
} from '../../../src/lib/db/queries/form-data.queries';
import type { IMembersData } from '../../../src/lib/lib.types';
import { generateKTId } from '../../../src/lib/utils/utils';
import { middlwares } from '../../../src/middleware/index.middlware';

interface ErrorData {
  error: string;
}
interface SuccessData {
  message: string;
}
interface NextReqWithBody extends NextApiRequest {
  body: IMembersData;
}

const handler = nc().use(middlwares);

handler.post(
  async (
    req: NextReqWithBody,
    res: NextApiResponse<IMembersData | SuccessData | ErrorData>,
  ) => {
    const {
      name,
      email,
      formation,
      studyLevel,
      school,
      status = [],
      joined,
    } = req.body;
    try {
      // eslint-disable-next-line no-console
      console.log('addd>', req.body);
      if (
        !name ||
        !email ||
        !formation ||
        !studyLevel ||
        !status.length ||
        typeof joined !== 'boolean'
      ) {
        throw new Error('Certains champs important sont manquants');
      }

      if (await existsMember(email)) {
        throw new Error('Un membre avec cette adresse email existe déjà');
      }
      const { id, fullId } = generateKTId(email);
      await createMemberData({
        id,
        fullId,
        name,
        email,
        formation,
        studyLevel,
        status,
        school,
        joined,
        adhesionDate: joined ? new Date(Date.now()) : undefined,
      });

      res.status(201).json({ message: 'Member created' });
    } catch (err) {
      res.status(400).json({ error: (<Error>err).message });
    }
  },
);

export default handler;
