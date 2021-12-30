/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import type Express from 'express';
import type { Document, Model } from 'mongoose';

declare global {
  var MembersData: Model<IFormDataSchema>;
}

export interface Data {
  id: string;
  fullId: string;
  name: string;
  email: string;
  formation: string;
  studyLevel: string;
  status: string[];
  school?: string;
}
export type IMembersData = Data;

export interface IFormDataSchema extends Data, Document {
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

export interface MemberDataWithCount {
  data: IMembersData[];
  count: number;
}

interface TableColumn {
  field: string;
  header: string;
}

export interface TableData extends MemberDataWithCount {
  columns: TableColumn[];
}
