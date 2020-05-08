import React, { useContext, createRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListTable/ListsTable"
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
    paddingTop: theme.spacing(10)
  },
  link: {
    backgroundColor: "white",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1),
    cursor: "pointer"
  },
  linkContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  main: {
    marginTop: theme.spacing(5)
  },
  "@media (max-width: 720px)": {
    main: { width: "100%" },
    linkContainer: { width: "50%" },
    link: { width: "100%" }
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
        <div className={classes.linkContainer}>
          <Typography
            ref={ref}
            noWrap
            variant="subtitle2"
            className={classes.link}
            onClick={() => history.push(`/add/${list._id}`)}
          >
            {`${window.location.origin}/add/${list._id}`}
          </Typography>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={copy}
            className={classes.btn}
          >
            <FileCopyIcon color="primary" />
          </Button>
          <Feedback open={open} setOpen={setOpen} message={"Copied!"} />
        </div>
        <main className={classes.main}>
          <Container maxWidth="md" style={{ height: 750 }}>
            <ListsTable list={list} />
          </Container>
        </main>
      </section>
    </>
  )
}

export default List
