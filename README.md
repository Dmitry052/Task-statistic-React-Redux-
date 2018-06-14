# DEPENDENCES
 - node v9
 - redis for prod
# DEV AND TEST ENVIRONMENT

## INSTALL
```bash
npm i
npm run build

npm run start
or 
SENTRY_DSN=http://127.0.0.1 REDIS_HOST=redis REDIS_PORT=6379 npm run start
```
## RUN DEV
 > SSR
    - ON/OFF. Path congitTemp/config/config.js (development.server.ssr)
```bash
npm i
npm run test
npm run flow:deps
npm run dev
```
