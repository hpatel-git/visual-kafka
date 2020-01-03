import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles, fade } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import Moment from 'react-moment'
import ShowMoreText from 'react-show-more-text'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

const headCells = [
  {
    id: 'key',
    numeric: false,
    disablePadding: true,
    label: 'Key',
  },
  { id: 'partition', numeric: true, disablePadding: false, label: 'Partition' },
  { id: 'offset', numeric: true, disablePadding: false, label: 'Offset' },
  {
    id: 'timestamp',
    numeric: true,
    disablePadding: true,
    label: 'Timestamp',
  },
  { id: 'message', numeric: true, disablePadding: false, label: 'Message' },
]

function MessageListViewerHead(props) {
  const classes = useStyles()
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            // padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

// classes, order, orderBy, onRequestSort
MessageListViewerHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

const MessageListViewerToolbar = props => {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

MessageListViewerToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '16px',
    height: '100%',
  },
  tableWrapper: {
    width: '1000px',
    overflowX: 'auto',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: '100%',
    height: '100%',
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(0),
    height: '100%',
    position: 'absolute',
    left: '-15px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    color: 'blue',
  },
}))

MessageListViewer.propTypes = {
  filteredMessages: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      offset: PropTypes.number.isRequired,
      partition: PropTypes.number.isRequired,
      highWaterOffset: PropTypes.number.isRequired,
      key: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  searchMessageHandler: PropTypes.func.isRequired,
}
export default function MessageListViewer(props) {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('key')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { filteredMessages, searchMessageHandler } = props

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredMessages.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search message…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={event =>
            searchMessageHandler(event.target.value.toLowerCase())
          }
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <TableContainer className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <MessageListViewerHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={filteredMessages.length}
          />
          <TableBody>
            {stableSort(filteredMessages, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.key)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.key)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <ShowMoreText
                        /* Default options */
                        lines={1}
                        more="Show more"
                        less="Show less"
                        anchorClass={classes.messageText}
                        // onClick={this.executeOnClick}
                        expanded={false}
                        width={380}
                      >
                        {row.key}
                      </ShowMoreText>
                    </TableCell>
                    <TableCell align="right">{row.partition}</TableCell>
                    <TableCell align="right">{row.offset}</TableCell>
                    <TableCell align="right">
                      <Moment format="YYYY-MMM-DD hh:mm:ss">
                        {row.timestamp.toString()}
                      </Moment>
                    </TableCell>
                    <TableCell align="left">
                      <pre>
                        <ShowMoreText
                          /* Default options */
                          lines={1}
                          more="Show more"
                          less="Show less"
                          anchorClass={classes.messageText}
                          // onClick={this.executeOnClick}
                          expanded={false}
                          width={380}
                        >
                          {JSON.stringify(JSON.parse(row.value), null, 4)}
                        </ShowMoreText>
                      </pre>
                    </TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={filteredMessages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}
