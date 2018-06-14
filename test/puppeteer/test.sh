npm run jest &
NODE_ENV=development node ./dist/server/server.js &
pid_app=$!
sleep 2
npm run puppeteer &&
kill -9 $pid_app
