import mongoose from 'mongoose';
import { AccountSchema } from '../models/Account';
import { TowerEventSchema } from '../models/TowerEvent';
import { ValueSchema } from '../models/Value';
import { TicketSchema } from '../models/Ticket';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('TowerEvent', TowerEventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);
}

export const dbContext = new DbContext()
