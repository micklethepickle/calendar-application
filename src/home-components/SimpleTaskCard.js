import React, { Component } from 'react';
import './stylesheets/StaticTask.css';
import axios from 'axios';
import EditTask from './EditTask';

import { Button, Input, Icon, Card} from 'semantic-ui-react';

class StaticTask extends Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.props.clickedTask(this.props.task);
	}

	render(){
		const title = this.props.task.title;
		const description = this.props.task.description;
		const label = this.props.label;

		var due_date = null;
		if (this.props.showDate == true){
			const d_date = new Date(this.props.task.due_date)
			const dateString = d_date.getFullYear() + '/' + d_date.getMonth() + '/' + d_date.getDate();
			due_date = <div className="dueDate">{dateString} </div>
		} 


		const popupTrigger = <div className="taskInfo task-item">
					<div className="taskInfo">
						<div className="title">
							{title}
						</div>
						<div className="desc">
							{description}
						</div>
						<div className="timeLeft">
							{this.props.task.actual_times.last()} / {this.props.task.estimated_time} minutes
						</div>
						{due_date}
					</div>
				</div>

		return(
			<div className="StaticTask">
				<Card fluid onClick={this.handleClick} style={{color: 'black'}}>
					 {popupTrigger}
				<div className="color" style={{backgroundColor: label.color}} />
				</Card>
			</div>
		)
	}
}

export default StaticTask;