import React, { useContext } from "react"
import Container from "@material-ui/core/Container"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListsTable"
import { ListContext } from "../context/ListContext"
import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
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
        <main style={{ marginTop: 50 }}>
          {lists.map(list => (
            <Container
              key={list._id}
              maxWidth="md"
              style={{ marginBottom: 50 }}
            >
              <ListsTable
                title={list.title}
                fields={list.fields}
                members={list.members}
                active={list.active}
                id={list._id}
              />
            </Container>
          ))}
        </main>
      </section>
    </>
  )
}

export default Dashboard
