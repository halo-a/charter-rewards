import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useRouter } from "next/router";

const PageHeader = () => {
  const { pathname } = useRouter();
  const value = pathname === "/" ? 0 : 1;
  return (
    <AppBar component="header" position="static" style={{ padding: "16px" }}>
      <Typography variant="h4">Charter Rewards Program</Typography>

      <Tabs value={value}>
        <Tab href="/" label="Transaction Log" />
        <Tab href="/customers" label="Customer Points" />
      </Tabs>
    </AppBar>
  );
};

export default PageHeader;
