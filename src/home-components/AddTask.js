import React, { Component } from 'react';
import './stylesheets/AddTask.css';
import CloseButton from './../michels-library/CloseButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import { Form, Input, TextArea, Button, Icon} from 'semantic-ui-react';

const optionStyle={backgroundColor: "black"};
const valueToColor={one : '#fcaf4b', two: '#4dfc4b'}

class AddTask extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectedOption : '', 
			title: '',
			description: '',
			hours: 0,
			minutes: 0,
			displayError: false,
			errorMsg: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleHourChange = this.handleHourChange.bind(this);
		this.handleMinChange = this.handleMinChange.bind(this);
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
  		if(!isNaN(e.target.value)){
  			this.setState({hours: e.target.value})
  		}else{
  			this.setState({hours: ''})
  		}
  	}

  	handleMinChange(e){
  		if(!isNaN(e.target.value)){
  			this.setState({minutes: e.target.value})
  		}else{
  			this.setState({minutes: ''})
  		}
  	}

  	handleSubmit(){
  		if ( this.state.title == ''){
  			this.setState({displayError : true, errorMsg : 'Title not entered'});
  		}else{
  			const label_id = this.state.selectedOption == null? null : this.state.selectedOption.value;
  			console.log(this.props.username);
	  		var new_task = {
	  			username: this.props.username,
	  			hours: this.state.hours,
	  			minutes: this.state.minutes,
	  			title: this.state.title,
	  			description: this.state.description,
	  			label_id: label_id,
	  			cur_time: new Date().toString(),
	  			due_date: this.props.date.toString()
	  		};

	  		axios.post('http://34.217.32.176:8000/tasks', new_task).then( response => {
	  			this.props.updateTasks();
	  			this.props.remove();
	  		})
	  		.catch( error =>{
	  			console.log(error)
	  		})

  		}
  	}

	render(){
		const labels = this.props.labels.map((l) => {
			return {value: l._id, label: l.name, color: l.color};
		});

		const { selectedOption } = this.state;
    	const value = selectedOption && selectedOption.value;

    	const errorMsg = this.state.displayError? <div className="errorMsg">{this.state.errorMsg} </div> : null ;

    	console.log(this.props.task)

		return(
			<div className="AddTask">

				<Form className="taskForm" size="large">
					
					<Input className="titleInput" type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange} />
					<Form.Field control={TextArea} className="descInput" cols="40" rows="5" placeholder="Description" value={this.state.description} onChange={this.handleDescChange} />
					<Select
						placeholder="Label"
						className="labelSelector"
				        name="form-field-name"
				        value={value}
				        onChange={this.handleChange}
				        optionRenderer={this.renderOptions}
				        valueRenderer={this.renderValue}
				        options={labels} />

				    Estimated Time
				    <Form.Group widths='equal' >
				    	<Form.Field fluid control={Input} label="Hours" placeholder="Hours" value={this.state.hours} onChange={this.handleHourChange} />
				    	<Form.Field fluid control={Input} label="Minutes" placeholder="Minutes" value={this.state.minutes} onChange={this.handleMinChange}/>
				    </Form.Group>
				    <Form.Button onClick={this.handleSubmit}> Submit </Form.Button>

				    {errorMsg}
				</Form>
			</div>
		)
	}
}

export default AddTask;