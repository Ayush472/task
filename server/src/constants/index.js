const PORT = process.env.PORT || 3001
const WEB_BUILD_DIR = "../../web/build"
const STATUS_SUCCESSFUL = 200
const STATUS_SERVER_ERR = 500
const DEFAULT_ERR_MSG = "Server error occured."
module.exports = { PORT, WEB_BUILD_DIR, STATUS_SUCCESSFUL, STATUS_SERVER_ERR, DEFAULT_ERR_MSG }