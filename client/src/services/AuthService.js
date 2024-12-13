import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState.js'
import { domain, clientId, audience } from '../env.js'
import { accountService } from './AccountService.js'
import { api } from './AxiosService.js'
import { socketService } from './SocketService.js'


export const AuthService = initialize({
  domain,
  clientId,
  authorizationParams: {
    audience,
    redirect_uri: window.location.origin
  },
  onRedirectCallback: appState => {
    window.location.replace(
      appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
    )
  }
})

AuthService.on('authenticated', async function() {
  api.defaults.headers.common['Authorization'] = AuthService.bearer
  api.interceptors.request.use(refreshAuthToken)
  AppState.identity = AuthService.identity
  await accountService.getAccount()
  socketService.authenticate(AuthService.bearer)
  // NOTE if there is something you want to do once the user is authenticated, place that here
})


async function refreshAuthToken(config) {
  if (!AuthService.user) { return config }
  const expires = AuthService.identity.exp * 1000
  const expired = expires < Date.now()
  const needsRefresh = expires < Date.now() + (1000 * 60 * 60 * 12)
  if (expired) {
    await AuthService.loginWithPopup()
  } else if (needsRefresh) {
    await AuthService.getTokenSilently()
    api.defaults.headers.common['Authorization'] = AuthService.bearer
  }
  return config
}

