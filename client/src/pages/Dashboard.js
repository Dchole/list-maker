import React, { useContext } from "react"
import Container from "@material-ui/core/Container"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListsTable"
import { ListContext } from "../context/ListContext"
import { useStyles } from "../components/styles/pageStyles"

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
