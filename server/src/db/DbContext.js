import mongoose from 'mongoose';
import { AccountSchema } from '../models/Account';
import { EventSchema } from '../models/Event';
import { ValueSchema } from '../models/Value';
import { TicketSchema } from '../models/Ticket';
import { CommentSchema } from '../models/Comment';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('TowerEvent', EventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);
  Comments = mongoose.model('Comments', CommentSchema);
}

export const dbContext = new DbContext()
