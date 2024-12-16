import { reactive } from 'vue'
import { Account } from './models/Account.js'
import { Event } from './models/Event'
import { Ticket } from './models/Ticket'
import { Comment } from './models/Comment'

export const AppState = reactive({
  user: {},
  account: {},
  events: [],
  activeEvent: null,
  tickets: [],
  comments: [],
  myTickets: [],
  myEvents: []
})