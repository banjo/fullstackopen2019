import React, { useEffect, useState } from 'react';
import getAll from './services/blogs';
import axios from 'axios';

function App() {
	useEffect(() => {
		axios.get('/api/blogs').then((res) => console.log(res.data));
	}, []);

	return <div>hello</div>;
}

export default App;
