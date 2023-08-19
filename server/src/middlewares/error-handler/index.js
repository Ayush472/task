const { STATUS_SERVER_ERR } = require("../../constants");
const { error } = require("../../response-api");

const errorHandler = (err, req, res, next) => {
    if(err){
        res.status(err.status??STATUS_SERVER_ERR).json(error(err.message, err.status));
    }else{
        next(res);
    }
};
module.exports = { errorHandler };
