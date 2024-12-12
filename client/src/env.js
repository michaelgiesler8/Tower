export const dev = window.location.origin.includes('localhost');
export const baseURL = dev ? 'http://localhost:3000' : '';
export const useSockets = false;
export const domain = import.meta.env.VITE_AUTH_DOMAIN || 'dev-s6n62lvv6zbfoman.us.auth0.com';
export const clientId = import.meta.env.VITE_AUTH_CLIENT_ID || 'NafJKRvSf1xchjf3sAEl9q1k9I3WwH3T';
export const audience = import.meta.env.VITE_AUTH_AUDIENCE || 'dev-s6n62lvv6zbfoman.us.auth0.com';