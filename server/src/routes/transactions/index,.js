const { TransactionsController } = require("../../controllers/transactions");

const transactionsRouter = require("express").Router();

transactionsRouter.get("/", TransactionsController.getTransactions);

module.exports = { transactionsRouter };
