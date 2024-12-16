import { reactive } from 'vue'
import { Event } from './models/Event'
import { Ticket } from './models/Ticket'
import { Comment } from './models/Comment'

export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {Event[]} */
  events: [],
  /** @type {Event} */
  activeEvent: null,
  /** @type {Ticket[]} */
  tickets: [],
  /** @type {Comment[]} */
  comments: [],
  /** @type {Ticket[]} */
  myTickets: [],
  /** @type {Event[]} */
  myEvents: []
})