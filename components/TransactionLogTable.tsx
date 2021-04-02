import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import useTransactions from "../hooks/useTransactions";
import Transaction from "../types/Transaction";

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
    tableBody: {
      "& tr": {
        "&:nth-child(odd)": {
          backgroundColor: theme.palette.grey[200],
        },
      },
    },
  })
);

const AllTransactionsList = () => {
  const classes = useStyles();
  const { transactions, isLoading, isError } = useTransactions();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching transactions :(</div>;

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell>Date, Time</TableCell>
              <TableCell>Transaction Amount</TableCell>
              <TableCell>Points Earned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {transactions
              .sort((a: Transaction, b: Transaction) => {
                // The dates are in the format provided by faker.js, so we instantiate
                // them as Date objects to easily compare them in the sort callback
                // @ts-ignore
                return new Date(b.date) - new Date(a.date);
              })
              .map((tx: Transaction) => {
                return (
                  <TableRow>
                    <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                    <TableCell>${tx.amount}</TableCell>
                    <TableCell>{tx.pointsEarned}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllTransactionsList;
