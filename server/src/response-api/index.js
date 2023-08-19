const { STATUS_SERVER_ERR, STATUS_SUCCESSFUL, DEFAULT_ERR_MSG } = require("../constants");

const success = (results, statusCode) => {
  return {
    message: null,
    isError: false,
    errors: null,
    data: results,
    status: statusCode??STATUS_SUCCESSFUL,
  };
};
const error = (message, statusCode, errors = []) => {
  return {
    message : message?.length>0 ?message :DEFAULT_ERR_MSG,
    isError: true,
    errors,
    data: null,
    status: statusCode ?? STATUS_SERVER_ERR,
  };
};

module.exports = { success, error };
