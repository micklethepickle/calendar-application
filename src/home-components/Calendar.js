import React, { Component } from 'react';
import "./stylesheets/Calendar.css";
import Week from './Week';
import Month from './Month';
import ZoomedDay from './ZoomedDay';

import Center from 'react-center';



Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Calendar extends Component{
	constructor(props){
		super(props);
		this.state = {isDateClicked : false, tasks: [], dayToTasks: {}}

		this.nextMonth = this.nextMonth.bind(this);
		this.updateWeeks = this.updateWeeks.bind(this);
		this.prevMonth = this.prevMonth.bind(this);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.hanldeRemoveZDay = this.hanldeRemoveZDay.bind(this);
	}

	componentWillMount(){
		var d = new Date();
		d.setDate(d.getMonth());
		this.setState({curMonth: d})
		this.updateWeeks(d);
	}

	updateWeeks(d){
		const curMonth = d.getMonth();

		d = d.addDays(-d.getDay());
		
		var weeks = [];
		var week = [];
		week.push(d);
		d = d.addDays(1);
		var count = 1;
		while(d.getMonth() == curMonth || d.getDay() != 0){
			if (count == 7){
				count = 0;
				weeks.push(week);
				week = [];
			}
			week.push(d);

			count += 1;
			d = d.addDays(1);
		}
		weeks.push(week);

		this.setState({weeks : weeks});
	}

	nextMonth(){
		var d = new Date();
		d.setFullYear(this.state.curMonth.getFullYear(),this.state.curMonth.getMonth() + 1, 1);
		this.setState({curMonth: d});
		this.updateWeeks(d);
	}

	prevMonth(){
		var d = new Date();
		d.setFullYear(this.state.curMonth.getFullYear(),this.state.curMonth.getMonth() - 1, 1);
		this.setState({curMonth: d});
		this.updateWeeks(d);
	}

	handleDayClick(date){
		var dayTasks = [];
		this.props.tasks.map((t) => {
			const d_date = new Date(t.due_date);
			if(d_date.getFullYear() == date.getFullYear() && 
				d_date.getMonth() == date.getMonth() && 
				d_date.getDate() == date.getDate()){

				dayTasks.push(t);
			}
		})
		this.setState({isDateClicked: true, dateClicked: date, selectedDayTasks: dayTasks});
	}

	hanldeRemoveZDay(){
		this.setState({isDateClicked: false});
	}

	render(){
		var zoomedDate = null;
		if(this.state.isDateClicked){
			zoomedDate = <ZoomedDay
							date={this.state.dateClicked} 
							remove={this.hanldeRemoveZDay} 
							username={this.props.username}
							labels={this.props.labels}
							label_ids={this.props.label_ids}
							tasks={this.state.selectedDayTasks}
							updateTasks={this.props.updateTasks}
							/>;
			console.log(zoomedDate);
		}


		const month = months[this.state.curMonth.getMonth()];
		const year = this.state.curMonth.getFullYear();
		const fullMonth = month + " " + year;

		return(
			<div className="Calendar">
				<center>
					{fullMonth}
				</center>
				<Center>
				<button onClick={this.prevMonth}> Previous </button>
				<button onClick={this.nextMonth}> Next </button>
				</Center>

				{zoomedDate}

				<Center>
				<Month 
					date={this.state.curMonth} 
					weeks={this.state.weeks} 
					dayClicker={this.handleDayClick} 
					username={this.props.username}
					dayToTasks={this.props.dayToTasks}
					label_ids={this.props.label_ids}/>
				</Center>
			</div>
		)
	}
}

export default Calendar;