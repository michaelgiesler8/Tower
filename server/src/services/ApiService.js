import axios from 'axios'
import { Auth0Provider } from '@bcwdev/auth0provider'

const apiBaseUrl = 'https://dev-s6n62lvv6zbfoman.us.auth0.com'

export const ApiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});



