rm -rf node_modules
npm install
docker build -t eu.gcr.io/pgmtc-net/md-web-client .
docker push eu.gcr.io/pgmtc-net/md-web-client
