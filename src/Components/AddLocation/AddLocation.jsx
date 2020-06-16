import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addLocationFormConfigs } from "../../Assets/addLocationFormConfigs";
import "./AddLocation.css";
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import allActions from "../../Store/actionCreators";
import FacilityTimes from "../FacilityTimes/FacilityTimes";
import { makeStyles } from '@material-ui/core/styles';
import { IndexedDBService } from "../../Services/IndexedDBServices";

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
    },
  },
  actionRoot: {
    margin: '0 30px 20px 0',
  },
  formTitle: {
    color: '#28618e'
  },
  marginLeft: {
    marginLeft: 20
  },
  marginRight: {
    marginRight: 20
  }
}));

const AddLocation = (props) => {
  const [location, setLocation] = useState({ 'timeZone': 'America/Los_Angeles', 'state': 'CA' });
  const [error, setError] = useState({});
  const [openFacilityTimes, setopenFacilityTimes] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if(props.location) setLocation(props.location);
  }, [props.location]);

  const onInputChange = (event, elementId) => {
    setError({...error, [elementId]: false});
    setLocation({...location, [elementId]: event.target.value});
  }

  const onInputBlur = (event, elementId) => {

    if(elementId === 'locationName') {
      const currLocationName = event.target.value.trim();
      IndexedDBService.getAllLocationNames().then(allLocationNames => {
        if(currLocationName === '' || allLocationNames.includes(currLocationName)) {
          setError({...error, [elementId]: true});
        }
      }).catch(error => console.error('Oh!! An error occurred', error));
    }
    if(elementId === 'zipcode' && event.target.value !== '') {
      const regexForZipcodeValidation = /^[a-zA-Z0-9]{5,10}$/gm;
      setError({...error, [elementId]: !regexForZipcodeValidation.test(event.target.value)});
    }
    if(elementId === 'phoneNumber' && event.target.value !== '') {
      const regexForPhoneValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      setError({...error, [elementId]: !regexForPhoneValidation.test(event.target.value)});
    }
  }
  
  const onFacilityTimeClick = (event, elementId) => {
    if(elementId === 'facilityTimes') {
      const currLocationName = location['locationName'] ? location['locationName'].trim() : '';
      IndexedDBService.getAllLocationNames().then(allLocationNames => {
        if(props.location === null && (currLocationName === '' || allLocationNames.includes(currLocationName))) {
          setError({...error, 'locationName': true});
        } else {
          setopenFacilityTimes(true);
        }
      }).catch(error => console.error('Oh!! An error occurred', error));
    }
  }
  
  const onClose = () => {
    setLocation({ 'timeZone': 'America/Los_Angeles', 'state': 'CA' });
    setError({});
    props.handleClose();
  }
  
  const closeFacilityTimes = () => {
    setopenFacilityTimes(false);
  }
  
  const saveFacilityTimes = (facilityTimes) => {
    const facilityTimesDetails = [];
    Object.values(facilityTimes).forEach(time => {
      if(time.isChecked) {
        facilityTimesDetails.push({...time});
      }
    })
    setLocation({...location, 'facilityTimes': [...facilityTimesDetails]});
    setopenFacilityTimes(false);
  }
  
  const onSaveClick = () => {
    if(!location['locationName'] || location['locationName'] === '') {
      setError({...error, 'locationName': true});
      return false;
    }
    const res = Object.values(error).find(ele => ele === true);
    if(res) return false;
    const isUpdate = props.location ? true : false;
    dispatch(allActions.addUpdateLocation(location, isUpdate));
    onClose();
  }

  return (
    <>
      <Dialog maxWidth='md' fullWidth open={props.open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.formTitle}>Add Location</DialogTitle>
        <DialogContent>
          <form onSubmit={onSaveClick}>
            {addLocationFormConfigs.map(ele => {
              let value = ele.id === 'facilityTimes' ? 'Click for facility timings details' : location[ele.id];  
              return <TextField error={error[ele.id]} helperText={ele.helperText || ''} key={ele.id} disabled={ele.id === 'locationName' && props.location !== null}
                inputProps={ele.maxLength ? { maxLength: ele.maxLength } : {}} margin="normal" id={ele.id}
                label={ele.label} required={ele.required} type={ele.type} onChange={event => onInputChange(event, ele.id)}
                onBlur={event => onInputBlur(event, ele.id)} onClick={event => onFacilityTimeClick(event, ele.id)}
                fullWidth={ele.fullWidth} value={value || ''} className={ele.className || ''} 
                classes={{root: ele.margin === 'left' ? classes.marginLeft : ele.margin === 'right' ? classes.marginRight : ''}}
                select={ele.select ? ele.select : null} >
                {ele.select ? ele.values.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                )) : null}
              </TextField>
            })}
          </form>
        </DialogContent>
        <DialogActions className={classes.actionRoot}>
          <Button onClick={onClose} classes={{root: classes.cancelButton}}>
            Cancel
          </Button>
          <Button type="submit" onClick={onSaveClick} classes={{root: classes.saveButton}} >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <FacilityTimes open={openFacilityTimes} handleClose={closeFacilityTimes} facilityTimesDetails={location.facilityTimes} saveFacilityTimes={saveFacilityTimes}/>
    </>
  );
}

export default AddLocation;
