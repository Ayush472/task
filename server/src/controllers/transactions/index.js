const { prisma } = require("../../../prisma/client");
const { STATUS_SUCCESSFUL, STATUS_SERVER_ERR } = require("../../constants");
const moment = require("moment");
const _ = require("lodash");
const { success } = require("../../response-api");
class TransactionsController {
  static getTransactions = async (req, res, next) => {
    try {
      const transactions = await prisma.transaction.findMany();
      const augmentedTransactions = await Promise.all(
        transactions.map(async (i, index) => {
          const products = await prisma.transaction.groupBy({
            by: "month_year",
            orderBy : { month_year : 'asc'},
            where: { product_purchased: { equals: i.product_purchased } },
            _avg: {
              sales: true,
            },
          });
          const groupedTransactions = _.groupBy(
            products.map((i) => ({
              ...i,
              month_year: moment(i.month_year).format("MMM YYYY"),
            })),
            "month_year"
          );
          const labels = Object.keys(groupedTransactions);
          const data = Object.values(groupedTransactions).map((i) =>
            i.reduce((prev, current) => ((prev + current._avg.sales) / 2).toFixed(2), 0)
          );

          return {
            ...i,
            chartData: {
              name: i.product_purchased,
              labels,
              data,
            },
          };
        })
      );
      res
        .status(STATUS_SUCCESSFUL)
        .json(
          success({
            count: transactions.length,
            transactions: augmentedTransactions,
          })
        );
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { TransactionsController };
