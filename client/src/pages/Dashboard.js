import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListTable/ListsTable"
import { ListContext } from "../context/ListContext"

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  head: {
    marginTop: theme.spacing(10)
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(5)
  },
  list: {
    marginBottom: theme.spacing(5)
  },
  "@media (max-width: 720px)": {
    main: { width: "100%" }
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  const {
    state: { lists },
    loading: { listLoading }
  } = useContext(ListContext)

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
              <div
                key={list._id}
                className={listLoading ? classes.loader : classes.list}
              >
                {listLoading ? (
                  <CircularProgress />
                ) : (
                  <ListsTable list={list} />
                )}
              </div>
            ))
          )}
        </Container>
      </main>
    </>
  )
}

export default Dashboard
