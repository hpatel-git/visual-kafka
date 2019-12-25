import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

const uuidv4 = require('uuid/v4')

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  titleColor: {
    color: 'black',
    textColor: '#fff',
    fontColor: 'black',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />
})

NewConnection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCloseWithoutSaving: PropTypes.func.isRequired,
}

export default function NewConnection(props) {
  const { isOpen, handleSave, handleCloseWithoutSaving } = props
  const classes = useStyles()
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseWithoutSaving}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-connectionDesc"
      >
        <DialogTitle className={classes.titleColor}>
          <span className={classes.titleColor}>Add New Connection</span>
        </DialogTitle>
        <Formik
          initialValues={{
            connectionName: '',
            bootstrapServerUrls: '',
            connectionDesc: '',
          }}
          validate={values => {
            const errors = {}
            if (!values.connectionName) {
              errors.connectionName = 'Connection Name is required'
            }
            if (!values.connectionDesc) {
              errors.connectionDesc = 'Connection Description is required'
            }
            if (!values.bootstrapServerUrls) {
              errors.bootstrapServerUrls = 'Bootstrap Server Urls are required'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            const newConnection = values
            newConnection.id = uuidv4()
            handleSave(newConnection)
            setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <div className={classes.root}>
                  <TextField
                    id="connectionName"
                    type="text"
                    name="connectionName"
                    label="Connection Name"
                    error={!!errors.connectionName}
                    style={{ margin: 8 }}
                    placeholder="Connection Name"
                    helperText={
                      errors.connectionName &&
                      touched.connectionName &&
                      errors.connectionName
                    }
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.connectionName}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="bootstrapServerUrls"
                    type="text"
                    name="bootstrapServerUrls"
                    label="Bootstrap Server Urls"
                    error={!!errors.bootstrapServerUrls}
                    style={{ margin: 8 }}
                    placeholder="Bootstrap Server Urls"
                    helperText={
                      errors.bootstrapServerUrls &&
                      touched.bootstrapServerUrls &&
                      errors.bootstrapServerUrls
                    }
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bootstrapServerUrls}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="connectionDesc"
                    type="text"
                    multiline
                    rows="4"
                    name="connectionDesc"
                    label="Connection Description"
                    style={{ margin: 8 }}
                    placeholder="connectionDesc"
                    error={!!errors.connectionDesc}
                    helperText={
                      errors.connectionDesc &&
                      touched.connectionDesc &&
                      errors.connectionDesc
                    }
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.connectionDesc}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Save
                </Button>
                <Button onClick={handleCloseWithoutSaving} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  )
}
