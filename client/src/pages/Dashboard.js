import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
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
    justifyContent: "space-between",
    alignItems: "center"
  },
  main: {
    marginTop: theme.spacing(10) * 1.2
  },
  "@media (max-width: 720px)": {
    main: { width: "100%" }
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  const {
    state: { lists }
  } = useContext(ListContext)

  return (
    <>
      <Navbar />
      <section className={classes.root}>
        <main className={classes.main}>
          {lists.map(list => (
            <Container
              key={list._id}
              maxWidth="md"
              style={{ marginBottom: 50 }}
            >
              <ListsTable list={list} />
            </Container>
          ))}
        </main>
      </section>
    </>
  )
}

export default Dashboard
