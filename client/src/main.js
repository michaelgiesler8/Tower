import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents.js'
import './registerGlobalSocketHandlers.js'
import { router } from './router.js'
import { initialize } from '@bcwdev/auth0provider-client'
import { domain, clientId, audience } from './env.js'

const root = createApp(App)

async function init() {
  initialize({
    domain: 'dev-s6n62lvv6zbfoman.us.auth0.com',
    clientId: 'NafJKRvSf1xchjf3sAEl9q1k9I3WwH3T',
    authorizationParams: {
      audience: 'https://dev-s6n62lvv6zbfoman.us.auth0.com/api/v2/',
      redirect_uri: 'http://localhost:8080'
    },
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
  })

  await registerGlobalComponents(root)
  root
    .use(router)
    .mount('#app')
}
init()
