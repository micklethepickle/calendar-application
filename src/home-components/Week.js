import React, { Component } from 'react';
import Day from './Day';
import './stylesheets/Week.css';

class Week extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const days = this.props.week;
		const listDays = days.map((d) =>{
			const day = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
			const tasks = this.props.dayToTasks[day];
			const workTime = this.props.dayToWork[day];
			return(
				<li>
					<Day 
						key={d.toString()} 
						date={d} 
						dayClicker={this.props.dayClicker} 
						username={this.props.username}
						tasks={tasks}
						workTime={workTime}
						label_ids={this.props.label_ids}/>
				</li>
			)
		});

		return(
			<div className="Week">
				<ul id="horizontal-week">
					{listDays}
				</ul>
			</div>
		)
	}
}

export default Week;