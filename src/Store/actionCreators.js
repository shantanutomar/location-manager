import { INSERT_LOCATION, INSERT_ALL_LOCATIONS, UPDATE_LOCATION, DELETE_LOCATION } from './actionConstants';
import { IndexedDBService } from "../Services/IndexedDBServices";

const insertAllLocationsInStore = (locations) => {
  return {
    type: INSERT_ALL_LOCATIONS,
    locations
  }
}

const insertLocationInStore = (location) => {
  return {
    type: INSERT_LOCATION,
    location
  }
}

const updateLocationInStore = (location) => {
  return {
    type: UPDATE_LOCATION,
    location
  }
}

const deleteLocationInStore = (location) => {
  return {
    type: DELETE_LOCATION,
    location
  }
}

const addUpdateLocation = (location, isUpdate) => {
  return async(dispatch) => {
    await IndexedDBService.addLocation(location);
    isUpdate ? dispatch(updateLocationInStore(location)) : dispatch(insertLocationInStore(location));
  }
}

const fetchAllLocations = () => {
  return async(dispatch) => {
    const allLocations = await IndexedDBService.getAllLocations();
    dispatch(insertAllLocationsInStore(allLocations));
  }
}

const deleteLocation = (location) => {
  return async(dispatch) => {
    await IndexedDBService.deleteLocation(location);
    dispatch(deleteLocationInStore(location));
  }
}

export default {addUpdateLocation, fetchAllLocations, deleteLocation};
