import Head from "next/head";
import PageHeader from "../components/PageHeader";
import CustomersPointsTable from "../components/CustomersPointsTable";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { backgroundColor: theme.palette.grey[200] },
  })
);

export default function Customers() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title key="title-charter-rewards">Charter Rewards</title>
        <link key="icon-favicon" rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />
      <CustomersPointsTable />
    </div>
  );
}
