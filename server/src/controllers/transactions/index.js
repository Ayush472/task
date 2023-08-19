const { prisma } = require("../../../prisma/client");
const { STATUS_SUCCESSFUL, STATUS_SERVER_ERR } = require("../../constants");
const { success } = require("../../response-api");
class TransactionsController {
  static getTransactions = async (_, res, next) => {
    try {
      const transactions = await prisma.transaction.findMany();
      res
        .status(STATUS_SUCCESSFUL)
        .json(success(transactions));
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { TransactionsController };
