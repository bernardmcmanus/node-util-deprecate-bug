'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import GnarlyComponent from './component';

ReactDOM.render(
	<GnarlyComponent
		inner="hey!"
	/>,
	document.querySelector('#main')
);
