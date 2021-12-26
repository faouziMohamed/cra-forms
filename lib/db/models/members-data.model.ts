import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

import { IFormDataSchema, IMembersData } from '../../lib.types';
import { startCase, startCaseAll, validateEmail } from '../../utils/utils';

const membersDataSchema = new Schema<IFormDataSchema>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => validateEmail(email),
      },
    },
    formation: { type: String, required: true },
    studyLevel: { type: String, required: true },
    school: { type: String },
  },
  { timestamps: true },
);

membersDataSchema.index({ email: 1 }, { unique: true });

const transform = (doc: Document, ret: IMembersData) => {
  ret.id = ret._id as string;
  delete ret._id;
  delete ret.__v;
};

membersDataSchema.set('toJSON', { transform });
membersDataSchema.set('toObject', { transform });
membersDataSchema.pre('save', function reformatValues(next) {
  if (this.isModified('name')) this.name = startCaseAll(this.name);
  if (this.isModified('email')) this.email = this.email.toLowerCase();
  if (this.isModified('formation')) this.formation = startCase(this.formation);
  if (this.isModified('studyLevel')) {
    this.studyLevel = startCase(this.studyLevel);
  }
  if (this.isModified('school') && this.school) {
    this.school = startCaseAll(this.school);
  }
  next();
});

const MembersData =
  global.MembersData || model('MembersData', membersDataSchema);
global.MembersData = MembersData;

export default MembersData;
