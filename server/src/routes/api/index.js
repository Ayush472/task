const { transactionsRouter } = require("../transactions/index,");

const apiRouter = require("express").Router();

apiRouter.use("/transactions", transactionsRouter);

module.exports = { apiRouter };
