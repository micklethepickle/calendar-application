import React, { Component } from 'react';
import './stylesheets/TaskProgressBar.css';

import {Progress} from 'semantic-ui-react';

class TaskProgressBar extends Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props.percent)
		return(
			<Progress percent={this.props.percent} indicating attached="top" />
		)
	}
}

export default TaskProgressBar;