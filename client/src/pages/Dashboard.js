import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Navbar from "../components/Layout/Navbar";
import ListsTable from "../components/ListTable/ListsTable";
import { useStyles } from "./styles/dashboard";
import { ListContext } from "../context/ListContext";

const Dashboard = () => {
  const classes = useStyles();
  const {
    state: { lists },
    loading: { listLoading }
  } = useContext(ListContext);

  return (
    <>
      <Navbar />
      <main className={classes.root}>
        <Typography variant="h4" component="h1" className={classes.head}>
          All Lists
        </Typography>
        <Container maxWidth="md">
          {lists.length === 0 ? (
            <Typography variant="h5" component="p" color="textSecondary">
              Your lists are empty
            </Typography>
          ) : (
            lists.map(list => (
              <Container
                key={list._id}
                className={listLoading ? classes.loader : classes.list}
              >
                {listLoading ? (
                  <CircularProgress />
                ) : (
                  <ListsTable list={list} />
                )}
              </Container>
            ))
          )}
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
