import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FacilityTime from "../FacilityTime/FacilityTime";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    backgroundColor: '#f9695e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f9695e',
    }
  },
  saveButton: {
    backgroundColor: '#28618e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#28618e',
    }
  },
  formTitle: {
    color: '#28618e'
  },
  fromToBlock: {
    marginBottom: '18px',
  },
  fromText: {
    marginLeft: '16%',
    fontWeight: '500',
  },
  toText: {
    marginLeft: '27%',
    fontWeight: '500',  
  },
  actionRoot: {
    margin: '0 30px 20px 0',
  }
}));


const FacilityTimes = (props) => {

  const initfacilityTimes = {
    sun: {day: 'sun', isChecked: false, fromTime: "", toTime: "", fromAMPM: 'AM', toAMPM: 'PM'},
    mon: {day: 'mon', isChecked: false, fromTime: "", toTime: "", fromAMPM: 'AM', toAMPM: 'PM'},
    tue: {day: 'tue', isChecked: false, fromTime: "", toTime: "", fromAMPM: 'AM', toAMPM: 'PM'},
    wed: {day: 'wed', isChecked: false, fromTime: "", toTime: "", fromAMPM: 'AM', toAMPM: 'PM'},
    thu: {day: 'thu', isChecked: false, fromTime: "", toTime: "", fromAMPM: 'AM', toAMPM: 'PM'},
    fri: {day: 'fri', isChecked: false, fromTime: "", toTime: "", fromAMPM: 'AM', toAMPM: 'PM'},
    sat: {day: 'sat', isChecked: false, fromTime: "", toTime: "", fromAMPM: 'AM', toAMPM: 'PM'},
  }

  const [facilityTimes, setfacilityTimes] = useState(initfacilityTimes);
  const classes = useStyles();

  useEffect(() => {
    if(props.facilityTimesDetails && props.facilityTimesDetails.length > 0) {
      let updatedFacilityTimes = {};
      props.facilityTimesDetails.forEach(time => {
        updatedFacilityTimes[time.day] = {
          ...time
        }
      });
      setfacilityTimes({...facilityTimes, ...updatedFacilityTimes});
    } else {
      setfacilityTimes(initfacilityTimes);
    }
  }, [props.open]);

  const onClose = () => {
    props.handleClose();
    setfacilityTimes({...initfacilityTimes});
  }
  
  const convertTimeTo12HrFormat = (time) => {
    let convertedTime = "";
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];
    let amPm = "";
    amPm = parseInt(hours) === 12 ? "PM" : parseInt(hours) === 0 ? "AM" : (parseInt(hours) > 11) ? "PM" : "AM";
    convertedTime += convertedTime.length ? `-${parseInt(hours) === 12 || parseInt(hours) === 0 ? `12` : parseInt(hours) % 12}:${minutes}-${amPm}` : 
      `${parseInt(hours) === 12 || parseInt(hours) === 0 ? `12` : parseInt(hours) % 12}:${minutes}-${amPm}`

    return convertedTime.split("-")
  }
  
  const onInputBlur = (event, day, elementId) => {
    if(event.target.value !== "") {
      const convertedTime = convertTimeTo12HrFormat(event.target.value);
      if(elementId === `${day}From`) {
        setfacilityTimes({...facilityTimes, [day]: {...facilityTimes[day], fromTime: convertedTime[0], fromAMPM: convertedTime[1]}});
      } else if(elementId === `${day}To`) {
        setfacilityTimes({...facilityTimes, [day]: {...facilityTimes[day], toTime: convertedTime[0], toAMPM: convertedTime[1]}});
      }
    }
  }
  
  const onInputChange = (event, day, elementId) => {
    if(elementId === `${day}Checkbox`) {
      setfacilityTimes({...facilityTimes, [day]: {...facilityTimes[day], isChecked: !facilityTimes[day].isChecked}});
    }
    if(elementId === `${day}From`) {
      setfacilityTimes({...facilityTimes, [day]: {...facilityTimes[day], fromTime: event.target.value}});
    }
    if(elementId === `${day}To`) {
      setfacilityTimes({...facilityTimes, [day]: {...facilityTimes[day], toTime: event.target.value}});
    }
  }
  
  const onSaveClick = () => {
    props.saveFacilityTimes(facilityTimes);
    setfacilityTimes({...initfacilityTimes});
  }
  
  const onApplyToAllChecked = (day) => {
    if(facilityTimes[day].fromTime === "" || facilityTimes[day].toTime === "") {
      alert('Enter time');
      return false;
    }
    Object.values(facilityTimes).forEach(time => {
      if(time.isChecked) {
        facilityTimes[time.day] = {
          ...time,
          fromTime: facilityTimes[day].fromTime, 
          toTime: facilityTimes[day].toTime,
          fromAMPM: facilityTimes[day].fromAMPM,
          toAMPM: facilityTimes[day].toAMPM,
        }
      }
    });
    setfacilityTimes({...facilityTimes});
  }
  
  return (
    <>
      <Dialog maxWidth='md' fullWidth open={props.open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.formTitle}>Facility Times</DialogTitle>
        <DialogContent>
          <section className={classes.fromToBlock}>
            <span className={classes.fromText}>From</span>
            <span className={classes.toText}>To</span>
          </section>
          {Object.values(facilityTimes).map(facilityTime => {
            return <FacilityTime key={facilityTime.day} day={facilityTime.day} isChecked={facilityTime.isChecked} fromTime={facilityTime.fromTime} toTime={facilityTime.toTime} 
              fromAMPM={facilityTime.fromAMPM} toAMPM={facilityTime.toAMPM} onInputChange={onInputChange} onApplyToAllChecked={onApplyToAllChecked} onInputBlur={onInputBlur}
            />
          })}
        </DialogContent>
        <DialogActions className={classes.actionRoot}>
          <Button onClick={onClose} classes={{root: classes.cancelButton}} variant='contained'>
            Cancel
          </Button>
          <Button type="submit" classes={{root: classes.saveButton}} onClick={onSaveClick} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FacilityTimes;
