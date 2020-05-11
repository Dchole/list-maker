import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
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
      <div className={classes.root}>
        <section>
          <main>
            <Typography variant="h4" component="h1">
              All Lists
            </Typography>

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
      </div>
    </>
  )
}

export default Dashboard
