const transactions = require("../../data/transactions.json");

export default (_req, res) => {
  setTimeout(() => {
    // wait 150ms to 'simulate' a real network request
    res.status(200).json(transactions);
  }, 150);
};
