import mongoose from 'mongoose';
const { Schema } = mongoose;

export const AccountSchema = new Schema(
  {
    subs: [{ type: String }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    auth0Data: { type: Object, default: null },
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)



