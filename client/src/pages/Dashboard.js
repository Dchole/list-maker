import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListsTable"
import { ListContext } from "../context/ListContext"

const UseStyles = makeStyles(theme => ({
  list: {
    height: theme.breakpoints.values.md
  }
}))

const Dashboard = () => {
  const classes = UseStyles()

  const {
    state: { lists }
  } = useContext(ListContext)

  return (
    <>
      <Navbar />
      <section>
        <Container component="main">
          {lists.map(list => (
            <div className={classes.list}>
              <ListsTable
                key={list._id}
                fields={list.fields}
                members={list.members}
              />
            </div>
          ))}
        </Container>
      </section>
    </>
  )
}

export default Dashboard
