import React, { useContext, createRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Backdrop from "@material-ui/core/Backdrop"
import Link from "@material-ui/core/Link"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import Navbar from "../components/Navbar"
import ListsTable from "../components/ListTable/ListsTable"
import { ListContext } from "../context/ListContext"
import { useParams } from "react-router"
import Feedback from "../components/Feedback"
import { Link as RouterLink } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(10),
    overflow: "hidden"
  },
  title: { textTransform: "capitalize", marginBottom: theme.spacing(4) },
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
  container: {
    marginTop: theme.spacing(5)
  },

  "@media (max-width: 720px)": {
    main: { width: "100%" },
    linkContainer: { width: "50%" },
    link: { width: "100%" }
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
    navigator.clipboard.writeText(ref.current.textContent)
    setOpen(true)
  }

  if (listLoading)
    return (
      <Backdrop open={listLoading} style={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  const linkToAddMember = `/add/${list._id}`

  return (
    <>
      <Navbar />
      <main className={classes.root}>
        <Typography variant="h4" component="h1" className={classes.title}>
          {list.title}
        </Typography>
        <div className={classes.linkContainer}>
          <Link
            component={RouterLink}
            to={linkToAddMember}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Typography
              ref={ref}
              noWrap
              variant="body2"
              className={classes.link}
            >
              {`${window.location.origin}/add/${list._id}`}
            </Typography>
          </Link>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={copy}
            className={classes.btn}
            aria-label="copy link address"
          >
            <FileCopyIcon color="primary" />
          </Button>
          <Feedback open={open} setOpen={setOpen} message={"Copied!"} />
        </div>
        <div className={classes.container}>
          <Container maxWidth="md" style={{ height: 750 }}>
            <ListsTable list={list} />
          </Container>
        </div>
      </main>
    </>
  )
}

export default List
