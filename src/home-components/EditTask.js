import React, { Component } from 'react';
import './stylesheets/EditTask.css';
import CloseButton from './../michels-library/CloseButton';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import 'react-select/dist/react-select.css';
import axios from 'axios';

const optionStyle={backgroundColor: "black"};
const valueToColor={one : '#fcaf4b', two: '#4dfc4b'}
Array.prototype.last = function(){
    return this[this.length - 1];
};

class EditTask extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectedOption : {value: this.props.task.label, label: this.props.label.name, color: this.props.label.color}, 
			title: this.props.task.title,
			description: this.props.task.description,
			hours: Math.floor(this.props.task.estimated_time / 60),
			minutes: this.props.task.estimated_time % 60,
			act_hours: Math.floor(this.props.task.actual_times.last() / 60),
			act_minutes: this.props.task.actual_times.last() % 60,
			due_date: new Date(this.props.task.due_date),
			displayError: false,
			errorMsg: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleHourChange = this.handleHourChange.bind(this);
		this.handleMinChange = this.handleMinChange.bind(this);
		this.handleActHourChange = this.handleActHourChange.bind(this);
		this.handleActMinChange = this.handleActMinChange.bind(this);
		this.handleDDateChange = this.handleDDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (selectedOption) => {
	    this.setState({ selectedOption });
  	}

  	renderOptions(l){
  		return (<div style={{backgroundColor : l.color}}> {l.label}</div>);
  	}

  	renderValue(l){
  		return (<div style={{backgroundColor : l.color}}> {l.label}</div>)
  	}

  	handleTitleChange(e){
  		this.setState({title : e.target.value})
  	}

  	handleDescChange(e){
  		this.setState({description: e.target.value})
  	}

  	handleHourChange(e){
  		this.setState({hours: e.target.value})
  	}

  	handleMinChange(e){
  		this.setState({minutes : e.target.value})
  	}

  	handleActHourChange(e){
  		this.setState({act_hours : e.target.value})
  	}

  	handleActMinChange(e){
  		this.setState({act_minutes : e.target.value})
  	}

  	handleDDateChange(e){
  		console.log(e);
  		this.setState({due_date: e})
  	}

  	handleSubmit(){
  		if ( this.state.title == ''){
  			this.setState({displayError : true, errorMsg : 'Title not entered'});
  		}else{
  			const label_id = this.state.selectedOption == null? null : this.state.selectedOption.value;
  			const id = this.props.task._id;
	  		var new_task = {
	  			hours: this.state.hours,
	  			minutes: this.state.minutes,
	  			act_hours: this.state.act_hours,
	  			act_mins: this.state.act_minutes,
	  			title: this.state.title,
	  			description: this.state.description,
	  			label_id: label_id,
	  			cur_time: new Date().toString(),
	  			due_date: this.state.due_date
	  		};

	  		axios.put('http://localhost:8000/tasks/'+ id, new_task).then( response => {
	  			this.props.updateTasks();
	  		})
	  		.catch( error =>{
	  			console.log(error)
	  		})
	  		this.props.remove();
  		}
  	}

	render(){
		const labels = this.props.labels.map((l) => {
			return {value: l._id, label: l.name, color: l.color};
		});

		const { selectedOption } = this.state;
    	const value = selectedOption && selectedOption.value;

    	const errorMsg = this.state.displayError? <div className="errorMsg">{this.state.errorMsg} </div> : null ;

		return(
			<div className="EditTask">
				<CloseButton onClick={this.props.remove} />

				<form className="taskForm">
					
					<input className="titleInput" type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange} />
					<textarea className="descInput" cols="40" rows="5" placeholder="Description" value={this.state.description} onChange={this.handleDescChange} />
					<Select
						className="labelSelector"
				        name="form-field-name"
				        value={value}
				        onChange={this.handleChange}
				        optionRenderer={this.renderOptions}
				        valueRenderer={this.renderValue}
				        options={labels} />
					<table>
					    <tr>
					    	<td colspan="4">Estimated Time</td>
					    </tr>
					    <tr>
					    	<td>
					    	Hours
					    	</td>
					    	<td>
						    <input className="timeInput" type="number" placeholder="Hours" value={this.state.hours} onChange={this.handleHourChange}/>
						    </td>
						    <td>
						    Minutes
						    </td>
						    <td>
						    <input className="timeInput" type="number" placeholder="Minutes" value={this.state.minutes} onChange={this.handleMinChange}/>
						    </td>
						</tr>
				    </table>
				    <table>
					    <tr>
					    	<td colspan="4">Actual Time</td>
					    </tr>
					    <tr>
					    	<td>
					    	Hours
					    	</td>
					    	<td>
						    <input className="timeInput" type="number" placeholder="Hours" value={this.state.act_hours} onChange={this.handleActHourChange}/>
						    </td>
						    <td>
						    Minutes
						    </td>
						    <td>
						    <input className="timeInput" type="number" placeholder="Minutes" value={this.state.act_minutes} onChange={this.handleActMinChange}/>
						    </td>
						</tr>
				    </table>
				    <DatePicker
				    	className="datePicker"
				    	onChange={this.handleDDateChange}
				    	value={this.state.due_date}
				    />
				    <input type="button" value="Submit" onClick={this.handleSubmit}/>
				    {errorMsg}
				</form>
			</div>
		)
	}
}

export default EditTask;