import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState.js'
import { audience, clientId, domain } from '../env.js'
import { accountService } from './AccountService.js'
import { api } from './AxiosService.js'





export const AuthService = initialize({
  domain,
  clientId,
  authorizationParams: {
    audience,
    redirect_uri: 'http://localhost:8080/',
    prompt: 'login'
  },
  cacheLocation: 'localstorage',
  useRefreshTokens: true
})
AuthService.on('authenticated', async function() {
  api.defaults.headers.common['Authorization'] = AuthService.bearer
  api.interceptors.request.use(refreshAuthToken)
  AppState.identity = AuthService.identity
  await accountService.getAccount()
})

async function refreshAuthToken(config) {
  if(!AuthService.identity?.exp) { return config }
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





