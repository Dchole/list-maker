import React, { useContext, createRef, useState } from "react"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Backdrop from "@material-ui/core/Backdrop"
import Link from "@material-ui/core/Link"
import Hidden from "@material-ui/core/Hidden"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import Navbar from "../components/Layout/Navbar"
import ListsTable from "../components/ListTable/ListsTable"
import { ListContext } from "../context/ListContext"
import { useParams } from "react-router"
import Feedback from "../components/Feedback/Feedback"
import { useStyles } from "./styles/listPage"
import { Link as RouterLink } from "react-router-dom"

const ListPage = () => {
  document.title = "List Makerr - Control"

  /**
   * @type {{ id: string }}
   */
  const params = useParams()
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const {
    state: { lists },
    loading: { listLoading }
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
            style={{ textDecoration: "none", width: "50%" }}
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
          <Hidden smDown>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={copy}
              // className={classes.btn}
              aria-label="copy link address"
            >
              <FileCopyIcon color="primary" />
            </Button>
          </Hidden>
        </div>
        <Feedback open={open} setOpen={setOpen} message={"Copied!"} />
        <Container maxWidth="md" className={classes.container}>
          <ListsTable list={list} />
        </Container>
      </main>
    </>
  )
}

export default ListPage
