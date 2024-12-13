interface ImportMetaEnv {
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_AUTH_CLIENT_ID: string;
  readonly VITE_AUTH_AUDIENCE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CONNECTION_STRING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}