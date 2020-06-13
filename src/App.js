import React, { useEffect } from 'react';
import './App.css';
import { isIndexedDBSupported } from "./Services/IndexedDBServices";
import Locations from "./Components/Locations/Locations";

const App = () => {
	useEffect(() => {
		isIndexedDBSupported();
	}, [])

	return (
	  <div className="App">
	    <Locations/>
	  </div>
	);
}

export default App;
