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
})

AuthService.on('authenticated', async function() {
  api.defaults.headers.common['Authorization'] = AuthService.bearer
  AppState.identity = AuthService.identity
  await accountService.getAccount()
  socketService.authenticate(AuthService.bearer)
  // NOTE if there is something you want to do once the user is authenticated, place that here
})





