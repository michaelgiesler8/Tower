import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents.js'
import './registerGlobalSocketHandlers.js'
import { router } from './router.js'
import { auth0provider } from '@bcwdev/auth0provider-client'
import { domain, clientId, audience } from './env.js'

const root = createApp(App)

async function init() {
  auth0provider.configure({
    domain,
    clientId,
    audience,
    useRefreshTokens: true,
    onRedirectCallback: appState => {
      router.push(
        appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
      )
    }
  })

  await registerGlobalComponents(root)
  root
    .use(router)
    .mount('#app')
}
init()
