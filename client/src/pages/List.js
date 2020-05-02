import React, { useContext, createRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Snackbar from "@material-ui/core/Snackbar"
import Button from "@material-ui/core/Button"
import Grow from "@material-ui/core/Grow"
import Alert from "@material-ui/lab/Alert"
import CircularProgress from "@material-ui/core/CircularProgress"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListsTable"
import { ListContext } from "../context/ListContext"
import { useParams } from "react-router"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  link: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: 10,
    padding: 10
  }
}))

const List = () => {
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
    navigator.clipboard
      .writeText(ref.current.textContent)
      .then(() => console.log("Link copied successfully!"))
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
            onClick={copy}
          >{`${window.location.origin}/add/${list._id}`}</span>
          &nbsp;&nbsp;
          <Button variant="outlined" size="small" onClick={copy}>
            Copy
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Grow}
            autoHideDuration={1000}
          >
            <Alert severity="success">Copied!</Alert>
          </Snackbar>
        </div>
        <main style={{ marginTop: 50 }}>
          <Container maxWidth="md">
            <ListsTable
              title={list.title}
              fields={list.fields}
              members={list.members}
            />
          </Container>
        </main>
      </section>
    </>
  )
}

export default List
