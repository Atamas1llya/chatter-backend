import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-as-promised';
import findOrCreate from 'mongoose-find-or-create';

const UserSchema = new Schema({
  local: {
    email: {
      type: String,
      sparse: true,
    },
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  global: {
    username: {
      type: String,
      required: true,
    },
    bio: String,
  },
});
UserSchema.plugin(findOrCreate);


UserSchema.pre('save', async function (next) {
  if (!this.isModified() || !this.local.email) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.local.password, salt);

  this.local.password = hash;
  next();
});

// UserSchema.methods.hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//
//   return hash;
// }

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};


export default mongoose.model('User', UserSchema);
