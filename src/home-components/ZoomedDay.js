import React, { Component } from 'react';
import './stylesheets/ZoomedDay.css';
import AddTask from './AddTask';
import CloseButton from './../michels-library/CloseButton';
import TaskItem from './TaskItem';

import {Button, Icon, Popup} from 'semantic-ui-react';

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
				{taskItems}
				<Popup on="click" open={this.state.addingItem} onOpen={this.addItem} onClose={this.hanldeRemoveAddTask} trigger={<Button className="add-item-btn" icon="add" />} content={<AddTask 
						date={this.props.date} 
						remove={this.hanldeRemoveAddTask} 
						username={this.props.username} 
						labels={this.props.labels}
						updateTasks={this.props.updateTasks}/>}/>

			</div>
		)
	}
}

export default ZoomedDay;