import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import {
  createMemberData,
  existsMember,
} from '../../../lib/db/queries/form-data.queries';
import { middlwares } from '../../../middleware/index.middlware';

interface Data {
  name: string;
  email: string;
  formation: string;
  studyLevel: string;
  school?: string;
}

interface ErrorData {
  error: string;
}
interface SuccessData {
  message: string;
}
interface NextReqWithBody extends NextApiRequest {
  body: Data;
}

const handler = nc().use(middlwares);

handler.post(
  async (
    req: NextReqWithBody,
    res: NextApiResponse<Data | SuccessData | ErrorData>,
  ) => {
    const { name, email, formation, studyLevel, school } = req.body;
    try {
      // eslint-disable-next-line no-console
      console.log(req.body);
      if (!name || !email || !formation || !studyLevel) {
        throw new Error('Certains champs important sont manquants');
      }

      if (await existsMember(email)) {
        throw new Error('Un membre avec cette adresse email existe déjà');
      }
      const member = await createMemberData({
        name,
        email,
        formation,
        studyLevel,
        school,
      });

      // eslint-disable-next-line no-console
      console.log(member);
      res.status(201).json({ message: 'Member created' });
    } catch (err) {
      res.status(400).json({ error: (<Error>err).message });
    }
  },
);

export default handler;
