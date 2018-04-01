import React, { Component } from 'react';
import './stylesheets/Timer.css';
import { Card, Icon, Button, Popup, Progress} from 'semantic-ui-react';
import axios from 'axios';

import ListTasks from './ListTasks';


class Timer extends Component{
	constructor(props){
		super(props);
		this.state = {
			curState: "zero",
			startTime: 0,
			isRunning : false,
			curTime: 0,
			saving: false
		}
		this.incrementer = null;

		this.handleStart = this.handleStart.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.clickedTask = this.clickedTask.bind(this);
	}

	formatSeconds(sec) {
		const seconds = sec % 60;
		var minutes = Math.floor(sec / 60);
		const hours = Math.floor(minutes/ 60);
		minutes = minutes % 60;

		return ('0' + hours).slice(-2) + ':' +
			('0' + minutes).slice(-2) + ':' + 
			('0' + seconds).slice(-2)
	}

	handleStart(){
		var startTime = new Date();
		this.incrementer = setInterval( () => {
			const elapsedTime = Math.floor((new Date() - startTime) / 1000);
			this.setState({curTime : this.state.startTime + elapsedTime})
		}, 500)
		this.setState({curState: "running"})
	}

	handlePause(){
		clearInterval(this.incrementer);
		this.setState({startTime: this.state.curTime, curState: "paused"})
	}

	handleReset(){
		clearInterval(this.incrementer);
		this.setState({startTime: 0, curTime: 0, curState: "zero"});
	}

	handleSave(){
		clearInterval(this.incrementer);
		this.setState({saving: true, startTime: this.state.curTime});

	}

	clickedTask(t){

		const actual_time = t.actual_times.last() + Math.floor(this.state.curTime / 60);
		const id = t._id;
		var new_task = {
			hours: Math.floor(t.estimated_time / 60),
			minutes: t.estimated_time % 60,
			act_hours: Math.floor(actual_time / 60),
			act_mins: actual_time % 60,
			title: t.title,
			description: t.description,
			label_id: t.label,
			cur_time: new Date().toString(),
			due_date: t.due_date
		};

		axios.put('http://34.217.32.176:8000/tasks/'+ id, new_task).then( response => {
			this.setState({saving: false, curTime: 0, startTime: 0, curState: "zero"});
			this.props.updateTasks();
		})
		.catch( error =>{
			console.log(error)
		})
	}

	handleClose(){
		this.setState({saving: false});
	}

	render(){
		const listOfTasks = <ListTasks
              tasks={this.props.tasks} 
              label_ids={this.props.label_ids} 
              labels={this.props.labels} 
              username={this.props.username}
              clickedTask={this.clickedTask}/>
        var saveBtn = null;
        var resetBtn = null;
        var saveBtnWhole = null;
        if (this.state.curState === "paused"){
	        saveBtn =(<Button icon onClick={this.handleSave} >
								<Icon name="save" size="big" />
							</Button>);
	        resetBtn = (<Button icon onClick={this.handleReset}>
        					<Icon name="stop" size="big"/>
        				</Button>);
	        saveBtnWhole = <Popup trigger={saveBtn} on="click" onClose={this.handleClose} content={listOfTasks} open={this.state.saving}/>
    	}

    	var pauseBtn = null;
    	if(this.state.curState === "running"){
    		pauseBtn = (<Button icon onClick={this.handlePause}>
							<Icon name="pause" size="big"/>
						</Button>);
    	}

    	var playBtn = null;
    	if (this.state.curState === "zero" || this.state.curState === "paused"){
        	playBtn = (<Button icon onClick={this.handleStart}>
							<Icon name="play" size="big"/>
						</Button>);
    	}

		return(
			<div className="timer">
				<Card >

					<div className="time-display">
						{this.formatSeconds(this.state.curTime)}
					</div>
					<Button.Group>
						{saveBtnWhole}
						{resetBtn}
						{pauseBtn}
						{playBtn}
					</Button.Group>
				</Card>
			</div>
		)
	}
}

export default Timer;