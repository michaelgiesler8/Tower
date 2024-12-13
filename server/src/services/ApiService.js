import auth0provider, { Auth0Provider } from '@bcwdev/auth0provider'

const apiBaseUrl = 'https://dev-s6n62lvv6zbfoman.us.auth0.com/api/v2/'

export const ApiClient = auth0provider.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});

ApiClient.interceptors.request.use(async (config) => {
  const token = process.env.AUTH0_API_TOKEN;
  if (!token) {
    throw new Error('AUTH0_API_TOKEN is not set in the environment variables');
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

