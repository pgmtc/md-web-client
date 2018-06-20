# md-web-client

Static http server used by md-server to provide front-end client

## Stand alone mode
If you want to run md-web-client in stand alone mode (in a container, for example), checkout the latest from the repository and run
```
git clone https://github.com/pgmtc/md-web-client
npm install
npm start
```

To change port which the server runs on, you can provide `PORT`, for example
```
export PORT=8081 && npm start
```

## Running as a module
If you want to run md-web-client as a module (inside some other node.js application), do the following
```
npm install md-web-client
```

Then, in the code, do the following:
```
import MdWebClient from 'md-web-client'
let mdWebClient = new MdWebClient()
let port = 8081
mdWebClient.listen(port)
```
