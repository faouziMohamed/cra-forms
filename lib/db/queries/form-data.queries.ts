import { LeanDocument } from 'mongoose';

import { Data, IFormDataSchema } from '../../lib.types';
import MembersData from '../models/members-data.model';

export const createMemberData = async ({
  name,
  email,
  formation,
  studyLevel,
  school,
}: Data) => MembersData.create({ name, email, formation, studyLevel, school });

export const existsMember = async (email: string) =>
  MembersData.exists({ email });
interface MemberDataWithCount {
  data: LeanDocument<IFormDataSchema & { _id: string }>[];
  count: number;
}
type FC = (page: number, limit: number) => Promise<MemberDataWithCount>;

export const getMembersDataWithPages: FC = async (page = 0, limit = 10) => {
  if (limit <= 0) throw new Error('limit must be greater than 0');
  const offset = page * limit;
  const allData = await MembersData.find().lean().exec();
  const data = allData.slice(offset, offset + limit);
  const count = await MembersData.count().exec();
  return { data, count };
};
