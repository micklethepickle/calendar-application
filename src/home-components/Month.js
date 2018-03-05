import React, { Component } from 'react';
import Week from './Week';
import './stylesheets/Month.css';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

class Month extends Component{
	constructor(props){
		super(props);

	}

	render(){
		const weeks = this.props.weeks;

		const listWeeks = weeks.map((week) =>
			<Week 
				key={week[0].toString()}
				week={week} 
				dayClicker={this.props.dayClicker} 
				username={this.props.username} 
				dayToTasks={this.props.dayToTasks}
				dayToWork={this.props.dayToWork}
				label_ids={this.props.label_ids}/>
		);

		const daysOfWeek = days.map((d) =>
			<div className="calendarObject">
				<someDay key={d}> <center>{d}</center> </someDay>
			</div>
		);
		const month = months[this.props.date.getMonth()];
		const year = this.props.date.getFullYear();
		const fullMonth = month + " " + year;
		return(
			<div className="Month">
				<div className="daysOfweek">
					{daysOfWeek}
				</div>
				{listWeeks}
			</div>
		)
	}
}

export default Month;