import Cors from 'cors';

import connectDB from '@/db/db.config';

import type { NextFunction, Request, Response } from '../lib/lib.types';

export const cors = () =>
  Cors({
    methods: ['GET', 'POST', 'PUT'],
    origin: true,
    credentials: true,
  });

export const headers =
  () => (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Credentials', 1);
    next();
  };

export const connectDatabase = () => connectDB((_req, _res, next) => next());
