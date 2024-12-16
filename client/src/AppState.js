import { reactive } from 'vue'


export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} */
  account: null,
  /** @type {import('./models/Event.js').Event[]} */
  towerEvents: [],
  /** @type {import('./models/Event.js').Event|null} */
  activeEvent: null,
  /** @type {import('./models/Ticket.js').Ticket[]} */
  tickets: [],
  /** @type {import('./models/Event.js').Event[]} */
  myEvents: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: []
})

