import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true, min: 0 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

})