import React, { Component } from 'react';
import './stylesheets/StaticTask.css';
import axios from 'axios';
import { Button, ButtonGroup} from 'react-bootstrap';

class StaticTask extends Component{
	constructor(props){
		super(props);

		this.state = {isCompleting : false, hours: null, minutes: null}

		this.handleHourChange = this.handleHourChange.bind(this);
		this.handleMinChange = this.handleMinChange.bind(this);

		this.quickComplete = this.quickComplete.bind(this);
		this.complete = this.complete.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.delete = this.delete.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
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
	  	this.setState({isCompleting: false})
	}

	complete(){
		this.setState({isCompleting: true})

	}

	handleCancel(){
		this.setState({isCompleting: false})
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

		const quickCompleteBtn = this.state.isCompleting ? null : <div className="buttonCell"><button className="quickComplete" onClick={this.quickComplete} /></div>;
		const completeBtn = this.state.isCompleting ? null :  <div className="buttonCell"><button className="complete" onClick={this.complete} /></div>;
		const deleteBtn = this.state.isCompleting ? null :  <div className="buttonCell"><button className="delete" onClick={this.delete} /></div>;

		const completeForm = this.state.isCompleting? 
			(
			<form className="form-item">
				<input className="sTaskInput" type="number" placeholder="h" value={this.state.hours} onChange={this.handleHourChange}/>
				:<input className="sTaskInput" type="number" placeholder="min" value={this.state.minutes} onChange={this.handleMinChange}/>
				<ButtonGroup>
					<Button className="completing-btns" bsStyle="success" onClick={this.handleComplete}/>
					<Button className="completing-btns" bsStyle="danger" onClick={this.handleCancel} />
				</ButtonGroup>
			</form>) : null;
		return(
			<div className="StaticTask">
				<div className="taskInfo task-item">
					<div className="taskInfo" style={{backgroundColor: label.color}} onClick={this.props.onClick}>
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
				<div className="buttons task-item">
					{quickCompleteBtn}
					{completeBtn}
					{deleteBtn}
					{completeForm}
				</div>
			</div>
		)
	}
}

export default StaticTask;