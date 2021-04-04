import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import Transaction from "../types/Transaction";
import useTransactions from "../hooks/useTransactions";
import Customer from "../types/Customer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { margin: "auto", width: "99vw" },
    tableContainer: {
      width: "75%",
      margin: "auto",
    },
    tableHead: {
      "& th": { fontWeight: `${theme.typography.fontWeightBold} !important` },
    },
    bold: { fontWeight: theme.typography.fontWeightBold },
    totalRow: {
      backgroundColor: blue[100],
    },
  })
);

function getCustomerDataFromTransactionData(transactions: Transaction[]) {
  return transactions.reduce((acc, curr) => {
    const found = acc.find((a) => a.customerName === curr.customerName);
    const monthInt = new Date(curr.date).getMonth();
    const month =
      monthInt === 0 ? "January" : monthInt === 1 ? "February" : "March";
    if (!found) {
      acc.push({
        customerName: curr.customerName,
        months: {
          [month]: curr.pointsEarned,
        },
        totalEarned: curr.pointsEarned,
        totalSpent: Number(curr.amount),
      });
    } else {
      found.totalEarned += curr.pointsEarned;
      found.totalSpent += Number(curr.amount);

      if (found[month]) {
        found[month] += curr.pointsEarned;
      } else {
        found[month] = curr.pointsEarned;
      }
    }
    return acc;
  }, []);
}

export default function Customers() {
  const classes = useStyles();
  const { transactions, isLoading, isError } = useTransactions();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching transactions</div>;

  const customerData = getCustomerDataFromTransactionData(transactions);

  const CustomerRows = ({ customer }) => {
    return (
      <>
        <TableRow className={classes.totalRow}>
          <TableCell>{customer.customerName}</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>{customer.totalEarned}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell> </TableCell>
          <TableCell>January</TableCell>
          <TableCell>{customer.January}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>February</TableCell>
          <TableCell>{customer.February}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>March</TableCell>
          <TableCell>{customer.March}</TableCell>
        </TableRow>
      </>
    );
  };
  return (
    <>
      <div className={classes.root}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell className={classes.bold}>Customer Name</TableCell>
                <TableCell className={classes.bold}>Month</TableCell>
                <TableCell className={classes.bold}>Points Earned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerData
                // .sort((a: Transaction, b: Transaction) => {
                // The dates are in the format provided by faker.js, so we instantiate
                // them as Date objects to easily compare them in the sort callback
                // @ts-ignore
                // return new Date(b.date) - new Date(a.date);
                // })
                .map((customer: Customer) => {
                  console.log(customer.month);
                  return (
                    <>
                      <CustomerRows customer={customer} />
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
