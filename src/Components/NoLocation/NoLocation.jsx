import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LocationOffIcon from '@material-ui/icons/LocationOff';

const useStyles = makeStyles((theme) => ({
  locationIcon: {
    height: '15%',
    width: '15%',
    color: '#28618e',
    marginTop: '15%'
  },
  info1: {
    fontSize: '24px',
    fontWeight: '500',
  },
  info2: {
    marginTop: '30px',
    fontSize: '18px',
    color: 'grey'
  }
}));


const NoLocation = () => {
  
  const classes = useStyles();
  return (
    <>
      <LocationOffIcon classes={{root: classes.locationIcon}}/>
      <div className={classes.info1}>Kindly Add Your Location First</div>
      <div className={classes.info2}>There is no location added right now</div>
    </>
  );
}

export default NoLocation;
