const MdWebClient = require('./index')
const PORT = process.env.PORT || 8080
const ROOT_DIR = process.env.ROOT_DIR || './dist'
const mdWebClient = new MdWebClient()
mdWebClient.listen(PORT, ROOT_DIR)
