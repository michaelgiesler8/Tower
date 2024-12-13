import mongoose from "mongoose";

const { Schema } = mongoose;

export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

export default TicketSchema
