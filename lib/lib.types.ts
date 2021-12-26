/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import type Express from 'express';
import type { Document, Model } from 'mongoose';

declare global {
  var MembersData: Model<IFormDataSchema>;
}

export interface Data {
  name: string;
  email: string;
  formation: string;
  studyLevel: string;
  school?: string;
}

export interface IFormDataSchema extends Data, Document {
  name: string;
  email: string;
  formation: string;
  studyLevel: string;
  school?: string;
}

export interface IMembersData extends IFormDataSchema {
  id: string;
}

export type NextFunction = Express.NextFunction;
export type Response = Express.Response;

export interface Request extends Express.Request {
  cookies: { [key: string]: string | number };
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
