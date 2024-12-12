export const dev = window.location.origin.includes('localhost');
export const baseURL = dev ? 'http://localhost:3000' : '';
export const useSockets = false;
export const domain = process.env.VUE_APP_AUTH_DOMAIN || 'dev-s6n62lvv6zbfoman.us.auth0.com';
export const clientId = process.env.VUE_APP_AUTH_CLIENT_ID || 'NafJKRvSf1xchjf3sAEl9q1k9I3WwH3T';
export const audience = process.env.VUE_APP_AUTH_AUDIENCE || 'dev-s6n62lvv6zbfoman.us.auth0.com';