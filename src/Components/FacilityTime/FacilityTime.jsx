import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    borderRadius: 0,
  },
  chipRootSelected: {
    borderRadius: 0,
    backgroundColor: '#28618e',
    color: "#fff"
  },
  textField: {
    width: '100px',
    height: '34px',
  },
  facilityTimesRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0',
  },
  formControlLabelRoot: {
    width: '60px',
  },
  timeContainer: {
    display: 'flex',
    width: '200px',
    justifyContent: 'space-between',
  }
}));

const FacilityTime = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.facilityTimesRoot}>
      <FormControlLabel
        className={classes.formControlLabelRoot}
        control={
          <Checkbox
            id={`${props.day}Checkbox`}
            checked={props.isChecked}
            onChange={(event) => props.onInputChange(event, props.day, `${props.day}Checkbox`)}
            name="checkedB"
            color='primary'
          />
        }
        label={props.day.toUpperCase()}
      />
      <section className={classes.timeContainer}>      
        <TextField
          id={`${props.day}From`}
          type="text"
          value={props.fromTime}
          variant="outlined"
          onBlur={(event) => props.onInputBlur(event, props.day, `${props.day}From`)}
          onChange={(event) => props.onInputChange(event, props.day, `${props.day}From`)}
          InputProps={{className: classes.textField}}      
        />
        <Chip label="AM" classes={{root: props.fromAMPM === 'AM' ? classes.chipRootSelected : classes.chipRoot}}/>
        <Chip label="PM" classes={{root: props.fromAMPM === 'PM' ? classes.chipRootSelected : classes.chipRoot}}/>
      </section>
      <section className={classes.timeContainer}>
        <TextField
          id={`${props.day}To`}
          type="text"
          onBlur={(event) => props.onInputBlur(event, props.day, `${props.day}To`)}
          onChange={(event) => props.onInputChange(event, props.day, `${props.day}To`)}
          value={props.toTime}
          variant="outlined"
          InputProps={{className: classes.textField}}      
        />
        <Chip label="AM" classes={{root: props.toAMPM === 'AM' ? classes.chipRootSelected : classes.chipRoot}}/>
        <Chip label="PM" classes={{root: props.toAMPM === 'PM' ? classes.chipRootSelected : classes.chipRoot}}/>
      </section>
      <Button variant="outlined" color="primary" onClick={() => props.onApplyToAllChecked(props.day)}>Apply to All Checked</Button>
    </div>
  )
}

export default FacilityTime;