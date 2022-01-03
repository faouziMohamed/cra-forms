import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

import type { IMembersSchema } from '@/lib/lib.types';
import { startCase, startCaseAll, validateEmail } from '@/utils/utils';

const membersSchema = new Schema<IMembersSchema>(
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
    joined: { type: Boolean, required: true },
    adhesionDate: { type: Date, default: undefined },
  },
  { timestamps: true, toJSON: { transform }, toObject: { transform } },
);

membersSchema.index({ email: 1 }, { unique: true });

function transform(doc: Document, ret: IMembersSchema) {
  delete ret._id;
  delete ret.__v;
}

membersSchema.pre('save', function reformatValues(next) {
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

const Members = global.Members || model('Members', membersSchema);
global.Members = Members;

export default Members;
