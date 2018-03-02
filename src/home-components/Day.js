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

	heatMapColorforValue(value, max){
		var normValue = value/max;
		if (normValue > max){
			var normValue = 1;
		}
		var h = (1.0 - normValue) * 240
		return "hsl(" + h + ", 100%, 50%)";
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
					<center>
					<div className="workTime" style={{color : this.heatMapColorforValue(this.props.workTime, 300)}}>
						{this.props.workTime}
					</div>
					</center>
					{taskTitles}
				</div>
			</div>
		)
	}
}

export default Day;