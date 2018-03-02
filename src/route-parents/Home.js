import React, { Component } from 'react';
import './stylesheets/Home.css';
import Calendar from './../home-components/Calendar';
import Board from './../home-components/Board';
import axios from 'axios';

class Home extends Component {
	constructor(props){
		super(props);
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
		        			dayToWork={this.props.dayToWork}
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
