import { reactive } from 'vue'


export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} */
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent|null} */
  activeEvent: null,
  /** @type {import('./models/Ticket.js').Ticket[]} */
  tickets: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  myEvents: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: []
})

