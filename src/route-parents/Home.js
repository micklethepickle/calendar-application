import React, { Component } from 'react';
import './stylesheets/Home.css';
import Calendar from './../home-components/Calendar';
import Board from './../home-components/Board';
import axios from 'axios';

class Home extends Component {
	constructor(props){
		super(props);
	}


	//Remaps list of tasks into an object where keys are the day, and value is
	//list of tasks
	//MAKE SURE TO CALL EVERYTIME TASKS IS UPDATED
	remapDayToTasks(tasks){
		const dayToTasks = {}
		tasks.map((t) => {
			const d_date = new Date(t.due_date);
			const day = d_date.getFullYear() + '-' + d_date.getMonth() + '-' + d_date.getDate();
			if (day in dayToTasks){
				var new_day = dayToTasks[day];
				new_day.push(t);
				dayToTasks[day] = new_day;
			}else{
				dayToTasks[day] = [t];
			}
		})
		return dayToTasks;
	}

  	render() {

	    return (
	      	<div className="Home">
	      		<table>
	      			<tr>
	      				<td style={{verticalAlign: "top" }} className="boardCell">
		      			<Board 
		      				tasks={this.props.tasks} 
		      				label_ids={this.props.label_ids} 
		      				labels={this.props.labels} 
		      				username={this.props.username}
		      				updateTasks={this.props.updateTasks}/>
		      			</td>
		      			<td className="calendarCell">
		        		<Calendar 
		        			tasks={this.props.tasks} 
		        			dayToTasks={this.props.dayToTasks} 
		        			labels={this.props.labels} 
		        			label_ids={this.props.label_ids}
		        			username={this.props.username}
		        			updateTasks={this.props.updateTasks}/>
		        		</td>
		        		</tr>
	        	</table>
	      	</div>
	    );
  	}
}

export default Home;
