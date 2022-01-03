import type { Data, IMembersData, MemberDataWithCount } from '@/lib/lib.types';

import Members from '../models/members.model';

export const createMemberData = async ({
  id,
  fullId,
  name,
  email,
  formation,
  studyLevel,
  school,
  status,
  joined,
  adhesionDate,
}: Data) =>
  Members.create({
    name,
    email,
    id,
    fullId,
    formation,
    studyLevel,
    status,
    school,
    joined,
    adhesionDate,
  });

export const existsMember = async (email: string) => Members.exists({ email });

type FC = (page: number, limit: number) => Promise<MemberDataWithCount>;

export const getMembersDataAggregate = async () =>
  Members.aggregate<IMembersData & { uid: string }>([
    { $addFields: { uid: '$_id' } },
    { $project: { _id: 0, __v: 0 } },
  ]).exec();

export const getMembersDataWithPages: FC = async (page = 0, limit = 10) => {
  if (limit < 0) throw new Error('limit must be positive');
  const allData = await getMembersDataAggregate();
  if (limit === 0) return { data: allData, count: allData.length };
  const offset = (page - 1) * limit;
  const data = allData.slice(offset, offset + limit);
  const count = data.length;
  return { data, count };
};
