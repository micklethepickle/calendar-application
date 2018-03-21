import React, { Component } from 'react';
import './stylesheets/StaticTask.css';
import axios from 'axios';
import EditTask from './EditTask';

import { Popup, Button, Input, Icon, Card} from 'semantic-ui-react';

class StaticTask extends Component{
	constructor(props){
		super(props);

		this.state = { 
			hours: Math.floor(this.props.task.actual_times.last() / 60),
			minutes: this.props.task.actual_times.last() % 60
		}

		this.handleHourChange = this.handleHourChange.bind(this);
		this.handleMinChange = this.handleMinChange.bind(this);

		this.quickComplete = this.quickComplete.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.delete = this.delete.bind(this);
	}

	handleHourChange(e){
		this.setState({hours: e.target.value})
	}

	handleMinChange(e){
		this.setState({minutes: e.target.value})
	}

	quickComplete(){
		const id = this.props.task._id;
		const body = {
			act_hours: Math.floor(this.props.task.estimated_time /60),
			act_mins: this.props.task.estimated_time % 60,
			cur_time: new Date().toString()
		}
		axios.put('http://34.217.32.176:8000/tasks/complete/'+ id, body).then( response => {
	  			this.props.updateTasks();
	  		})
	  		.catch( error =>{
	  			console.log(error)
	  		})
	}

	handleComplete(){
		const id = this.props.task._id;

		var hours = this.state.hours;
		var minutes = this.state.minutes;

		if(this.state.hours == null && this.state.minutes == null){
			hours = Math.floor(this.props.task.estimated_time /60);
			minutes = this.props.task.estimated_time % 60;
		}
		const body = {
			act_hours: hours,
			act_mins: minutes,
			cur_time: new Date().toString()
		}
		axios.put('http://34.217.32.176:8000/tasks/complete/'+ id, body).then( response => {
	  			this.props.updateTasks();
	  		})
	  		.catch( error =>{
	  			console.log(error)
	  		})
	}

	delete(){
		const id = this.props.task._id;

		const body= {
			username: this.props.username
		}

		axios.delete('http://34.217.32.176:8000/tasks/' + id, {data: body}).then( response =>{
			this.props.updateTasks();
		})
		.catch(error =>{
			console.log(error)
		})
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

		const completeForm = 
			<form className="form-item">
				<input className="sTaskInput" type="number" placeholder="h" value={this.state.hours} onChange={this.handleHourChange}/>
				:<input className="sTaskInput" type="number" placeholder="min" value={this.state.minutes} onChange={this.handleMinChange}/>
				<Button icon="checkmark" onClick={this.handleComplete}/>
			</form>

		const popupTrigger = <div className="taskInfo task-item">
					<div className="taskInfo">
						<div className="title">
							{title}
						</div>
						<div className="desc">
							{description}
						</div>
						<div className="timeLeft">
							{this.props.task.estimated_time} minutes
						</div>
						{due_date}
					</div>
				</div>

		return(
			<div className="StaticTask">
				<Card fluid >
				<Popup trigger={popupTrigger} on="click" content={<EditTask
							task={this.props.task} 
							remove={this.handleRemove} 
							labels={this.props.labels}
							label={this.props.label}
							updateTasks={this.props.updateTasks}
							onRemove={this.closePopup}/>}/>

				<div className="color" style={{backgroundColor: label.color}} />
				<div className="buttons task-item">
					<Button.Group fluid>
						<Button basic color="green" icon onClick={this.quickComplete} >
							<Icon name="flag checkered" size="big" color="green"/>
						</Button>
						<Popup trigger={<Button basic color="yellow" className="complete" icon ><Icon name="clock" size="big" color="yellow" /></Button>} content={completeForm} on='click' />
						<Button basic color="red" icon onClick={this.delete}  >
							<Icon name="delete calendar" size="big" color="red"/>
						</Button>
					</Button.Group>
				</div>
				</Card>
			</div>
		)
	}
}

export default StaticTask;