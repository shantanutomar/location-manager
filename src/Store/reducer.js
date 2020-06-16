const initState = {
  locations: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'INSERT_ALL_LOCATIONS':
      return [...action.locations];
    case 'INSERT_LOCATION':
      return [...state, {...action.location}];
    case 'UPDATE_LOCATION':
      const newState = state.map(location => {
        if(location.locationName === action.location.locationName) {
          return {...action.location};
        } else {
          return {...location};
        }
      });
      return [...newState];
    case 'DELETE_LOCATION':
      const index = state.findIndex(location => location.locationName === action.location);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export default reducer;