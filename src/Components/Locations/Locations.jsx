import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import allActions from "../../Store/actionCreators";
import { IndexedDBService } from "../../Services/IndexedDBServices";
import AddLocation from "../AddLocation/AddLocation";
import LocationsList from "../LocationsList/LocationsList"; 
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NoLocation from "../NoLocation/NoLocation";

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    display: 'flex',
    padding: '20px',
    justifyContent: 'space-between',  
  },
  addLocationButton: {
    borderRadius: 20,
    color: '#fff',
    backgroundColor: '#28618e',
    '&:hover': {
      backgroundColor: '#28618e',
    },
  },
  locationsText: {
    color: '#555',
    fontWeight: 500,
    fontSize: 20
  }
}));


const Locations = () => {
  
  const locations = useSelector(state => state);
  const dispatch = useDispatch();
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const [location, setLocation] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(allActions.fetchAllLocations());
  }, [])

  const onAddLocationClick = async(locationToUpdate) => {
    if(locationToUpdate) {
      const location = await IndexedDBService.getLocation(locationToUpdate);
      setLocation(location);
    } else {
      setLocation(null);
    }
    setOpenAddLocation(true);
  }
  
  const onDeleteClick = (locationToDelete) => {
    dispatch(allActions.deleteLocation(locationToDelete));
  }
  
  const closeAddLocation = () => {
    setOpenAddLocation(false);
  }
  return (
    <>
      <header className={classes.headerRoot}>
        <span className={classes.locationsText}>Locations</span>
        <Button onClick={() => onAddLocationClick(null)} variant="contained" classes={{root: classes.addLocationButton}}>
          + Add Locations
        </Button>
      </header>
      {locations.length > 0 ? 
        <LocationsList locations={locations} onEditClick={(updateLocationKey) => onAddLocationClick(updateLocationKey)} 
          onDeleteClick={(updateLocationKey) => onDeleteClick(updateLocationKey)}/> : <NoLocation/>}
      <AddLocation open={openAddLocation} handleClose={closeAddLocation} location={location ? location : null}/>
    </>
  );
}

export default Locations;
