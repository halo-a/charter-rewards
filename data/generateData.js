// import external modules
// -----------------------
const faker = require("faker");
const fs = require("fs");

// generate the data
// -----------------
const customerData = generateCustomerData();
const transactionData = generateTransactionData(customerData);

// save the data in json files in this directory
// ---------------------------------------------
saveDataToJsonFile("customers", customerData);
saveDataToJsonFile("transactions", transactionData);

// function declarations
// ---------------------
function generateCustomerData() {
  const customers = [];

  for (let i = 0; i < 10; i++) {
    const customerName = faker.name.findName();
    const customerId = faker.datatype.uuid();

    customers.push({ customerId, customerName });
  }

  return customers;
}

function generateTransactionData(customers) {
  // this function takes in an array of customers so that it can associate transactions with real customer ID's
  const transactions = [];

  for (let i = 0; i < 100; i++) {
    const customerIndex = Math.floor(Math.random() * customers.length);
    const customerId = customers[customerIndex]["customerId"];
    const customerName = customers[customerIndex]["customerName"];

    const date = faker.date.between("01/01/2021", "04/01/2021");
    const amount = faker.finance.amount(10, 400);

    const transaction = {
      date,
      amount,
      customerId,
      customerName,
    };

    transactions.push(transaction);
  }

  return transactions;
}

function saveDataToJsonFile(fileName, data) {
  fs.writeFileSync(fileName + ".json", JSON.stringify(data));
}
