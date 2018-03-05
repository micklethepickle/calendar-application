import React, { Component } from 'react';
import './stylesheets/ZoomedDay.css';
import AddTask from './AddTask';
import CloseButton from './../michels-library/CloseButton';
import TaskItem from './TaskItem';
import Img from 'react-image';

class ZoomedDay extends Component{
	constructor(props){
		super(props);

		this.state = {addingItem : false}
		this.addItem = this.addItem.bind(this);
		this.hanldeRemoveAddTask = this.hanldeRemoveAddTask.bind(this);
	}

	addItem(){
		this.setState({addingItem : true});
	}

	hanldeRemoveAddTask(){
		this.setState({addingItem: false});
	}


	render(){
		//log test


		var addTask = null
		if (this.state.addingItem == true){
			addTask = <AddTask 
						date={this.props.date} 
						remove={this.hanldeRemoveAddTask} 
						username={this.props.username} 
						labels={this.props.labels}
						updateTasks={this.props.updateTasks}/>
		}


		//Task components
		const taskItems = this.props.tasks.map(t => 
			<TaskItem 
				task={t} 
				label={this.props.label_ids[t.label]} 
				labels={this.props.labels} 
				username={this.props.username}
				updateTasks={this.props.updateTasks}/>
		)

		const dateString = this.props.date.toDateString();
		return(
			<div className="ZoomedDay">
				{dateString}
				<CloseButton onClick={this.props.remove} />
				{addTask}
				{taskItems}
				<Img className="add-item-btn" onClick={this.addItem} 
				src="https://raw.githubusercontent.com/google/material-design-icons/master/content/2x_web/ic_add_box_black_48dp.png"/>

			</div>
		)
	}
}

export default ZoomedDay;