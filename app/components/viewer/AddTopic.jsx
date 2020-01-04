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

const initialFormValues = {
  topic: '',
  partitions: 3,
  replicationFactor: 1,
}

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

AddTopic.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCloseWithoutSaving: PropTypes.func.isRequired,
}

export default function AddTopic(props) {
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
        aria-describedby="alert-dialog-slide-replicationFactor"
      >
        <DialogTitle className={classes.titleColor}>
          <span className={classes.titleColor}>Add New Topic</span>
        </DialogTitle>
        <Formik
          initialValues={initialFormValues}
          validate={values => {
            const errors = {}
            if (!values.topic) {
              errors.topic = 'Connection Name is required'
            }
            if (!values.replicationFactor) {
              errors.replicationFactor = 'Replication Factor is required'
            }
            if (!values.partitions) {
              errors.partitions = 'Number of Partitions is required'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const addTopic = values
            handleSave(addTopic)
            setSubmitting(false)
            resetForm(initialFormValues)
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
                    id="topic"
                    type="text"
                    name="topic"
                    label="Topic Name"
                    error={!!errors.topic}
                    style={{ margin: 8 }}
                    placeholder="Topic Name"
                    helperText={errors.topic && touched.topic && errors.topic}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.topic}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="partitions"
                    type="number"
                    name="partitions"
                    label="Partitions"
                    error={!!errors.partitions}
                    style={{ margin: 8 }}
                    placeholder="Partitions"
                    helperText={
                      errors.partitions &&
                      touched.partitions &&
                      errors.partitions
                    }
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.partitions}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="replicationFactor"
                    type="number"
                    name="replicationFactor"
                    label="Replication Factor"
                    style={{ margin: 8 }}
                    placeholder="Replication Factor"
                    error={!!errors.replicationFactor}
                    helperText={
                      errors.replicationFactor &&
                      touched.replicationFactor &&
                      errors.replicationFactor
                    }
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.replicationFactor}
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
