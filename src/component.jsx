'use strict';

import React from 'react';
import * as rad from './module';

export default class GnarlyComponent extends React.Component {
	render(){
		try {
			rad.oldRadFunction();
		} catch(err) {
			console.error(err.stack);
		}
		return (
			<div className="gnarly-component">
				<h3>{this.props.inner}</h3>
			</div>
		);
	}
}
