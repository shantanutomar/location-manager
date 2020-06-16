import { usStates, timeZones } from "./dropDownData";

export const addLocationFormConfigs = [
  {
    id: 'locationName',
    label: 'Location Name',
    type: 'text',
    required: true,
    fullWidth: true,
    helperText: "* This is required and should be unique."
  },
  {
    id: 'addressLine1',
    label: 'Address Line 1',
    type: 'text',
    required: false,
    fullWidth: false,
    className: 'width-half',
    margin: 'right'
  },
  {
    id: 'suiteNo',
    label: 'Suite No',
    type: 'text',
    required: false,
    fullWidth: false,
    className: 'width-half',
    margin: 'left'
  },
  {
    id: 'addressLine2',
    label: 'Address Line 2',
    type: 'text',
    required: false,
    fullWidth: false,
    className: 'width-half',
    margin: 'right'
  },
  {
    id: 'city',
    label: 'City',
    type: 'text',
    required: false,
    fullWidth: false,
    className: 'width-third',
    margin: 'left'
  },
  {
    id: 'state',
    label: 'State',
    type: 'text',
    select: true,
    values: usStates,
    required: false,
    fullWidth: false,
    className: 'width-third',
    margin: 'left'
  },
  {
    id: 'zipcode',
    label: 'Zip Code',
    type: 'text',
    required: false,
    fullWidth: false,
    className: 'width-third',
    helperText: 'Alphanumeric 5 to 10 characters. No Space allowed.',
    maxLength: 10,
    margin: 'right'
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    required: false,
    fullWidth: false,
    className: 'width-third',
    helperText: 'US Format.',
    maxLength: 12,
    margin: 'right'
  },
  {
    id: 'timeZone',
    label: 'Time Zone',
    type: 'text',
    required: false,
    fullWidth: false,
    select: true,
    values: timeZones,
    className: 'width-half',
    margin: 'left'
  },
  {
    id: 'facilityTimes',
    label: 'Facility Times',
    type: 'button',
    required: false,
    fullWidth: false,
    className: 'width-half',
    margin: 'right'
  },
  {
    id: 'appointmentPool',
    label: 'Appointment Pool',
    type: 'text',
    required: false,
    fullWidth: false,
    className: 'width-half',
    margin: 'left'
  }

]