import React, { Component } from 'react';
import './stylesheets/TaskItem.css';
import EditTask from './EditTask';
import StaticTask from './StaticTask';

class TaskItem extends Component{
	constructor(props){
		super(props);
		this.state = {}
	}


	render(){
		return(
			<div className="TaskItem">
				<StaticTask 
						labels={this.props.labels}
						task={this.props.task} 
						label={this.props.label} 
						username={this.props.username}
						showDate={this.props.showDate}
						updateTasks={this.props.updateTasks}/>
			</div>
		)
	}
}

export default TaskItem;