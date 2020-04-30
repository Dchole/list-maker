import React, { useContext } from "react"
import Container from "@material-ui/core/Container"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListsTable"
import { ListContext } from "../context/ListContext"

const Dashboard = () => {
  const {
    state: { lists }
  } = useContext(ListContext)

  return (
    <>
      <Navbar />
      <section>
        <main style={{ marginTop: 50 }}>
          {lists.map(list => (
            <Container key={list._id} maxWidth="md">
              <ListsTable fields={list.fields} members={list.members} />
            </Container>
          ))}
        </main>
      </section>
    </>
  )
}

export default Dashboard
