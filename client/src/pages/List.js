import React, { useContext, createRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListsTable"
import { ListContext } from "../context/ListContext"
import { useParams, useHistory } from "react-router"
import Feedback from "../components/Feedback"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50
  },
  link: {
    backgroundColor: "white",
    border: "1px solid black",
    padding: theme.spacing(1),
    cursor: "pointer"
  }
}))

const List = () => {
  const history = useHistory()
  const params = useParams()
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const {
    state: { lists },
    listLoading
  } = useContext(ListContext)

  const list = lists.find(list => list._id === params.id)
  const ref = createRef()

  const copy = () => {
    navigator.clipboard.writeText(ref.current.textContent)
    setOpen(true)
  }

  if (listLoading) return <CircularProgress />

  return (
    <>
      <Navbar />
      <section className={classes.root}>
        <div style={{ marginTop: 50 }}>
          <span
            ref={ref}
            className={classes.link}
            onClick={() => history.push(`/add/${list._id}`)}
          >
            {`${window.location.origin}/add/${list._id}`}
          </span>
          &nbsp;&nbsp;
          <Button variant="outlined" size="small" onClick={copy}>
            Copy
          </Button>
          <Feedback open={open} setOpen={setOpen} />
        </div>
        <main style={{ marginTop: 50 }}>
          <Container maxWidth="md">
            <ListsTable
              title={list.title}
              fields={list.fields}
              members={list.members}
              active={list.active}
              id={list._id}
            />
          </Container>
        </main>
      </section>
    </>
  )
}

export default List
