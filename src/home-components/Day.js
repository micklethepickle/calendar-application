import React, { Component } from 'react';
import './stylesheets/Day.css';

class Day extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		this.props.dayClicker(this.props.date);
	}

	render(){
		const dateString = this.props.date.getDate();

		var taskTitles = null;
		if (this.props.tasks != null) {
			taskTitles = this.props.tasks.map((t) => {
				return (<div className="task" style={{backgroundColor: this.props.label_ids[t.label].color}}> {t.title}</div>)
			});
		}

		return(
			<div className="Day" onClick={this.handleClick}>
				{dateString}
				<div className="taskListings">
					{taskTitles}
				</div>
			</div>
		)
	}
}

export default Day;