// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  production: true,
  hmr: false,
  version: env.npm_package_version,
  serverUrl: 'https://gql.sipecamdata.conabio.gob.mx/v3',
  kzCountersUrl: 'localhost:3000', //'https://gql.sipecamdata.conabio.gob.mx/kz-counters',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  mapbox: {
    accessToken:
      'pk.eyJ1IjoibnRyaW5pZGFkLWNvbmFiaW8iLCJhIjoiY2s1NWc5d3B3MGpsazNkc2JvdDl0dmswOSJ9.7aVSqlGPrLBHjt23HjBgPA',
    style: 'mapbox://styles/ntrinidad-conabio/ckcl6xwth0dky1io6f6t6sb26',
  },
  zendroUrl: 'https://zendro.sipecamdata.conabio.gob.mx/v3/',
  alfresco: {
    apiKey: 'lUEmE9EqA8DTGUXQS9Wzh3UcT9yV42rIIW9BFbNw',
    // url: 'https://api.conabio.gob.mx/test/search/',
    url: 'https://api.conabio.gob.mx/sipecam/reader/',
    url2: 'http://34.208.18.151/alfresco/api/-default-/public/search/versions/1/search',
  },
};
