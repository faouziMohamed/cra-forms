import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

import type { IFormDataSchema } from '../../lib.types';
import { startCase, startCaseAll, validateEmail } from '../../utils/utils';

const membersDataSchema = new Schema<IFormDataSchema>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    fullId: {
      type: String,
      required: true,
      unique: true,
    },
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
    status: { type: [String] },
    school: { type: String },
  },
  { timestamps: true, toJSON: { transform }, toObject: { transform } },
);

membersDataSchema.index({ email: 1 }, { unique: true });

function transform(doc: Document, ret: IFormDataSchema) {
  delete ret._id;
  delete ret.__v;
}

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
