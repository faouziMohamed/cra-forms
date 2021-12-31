import helmet from 'helmet';
import nc from 'next-connect';

import { connectDatabase, cors, headers } from './middleware';

export const middlwares = nc()
  .use(cors())
  .use(headers())
  .use(helmet())
  .use(connectDatabase());
