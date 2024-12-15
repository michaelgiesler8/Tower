import { axios } from 'axios'
import auth0provider, { Auth0Provider } from '@bcwdev/auth0provider'

const apiBaseUrl = 'https://dev-s6n62lvv6zbfoman.us.auth0.com'

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});



