import React, { Component } from 'react';
import './stylesheets/TaskItem.css';
import EditTask from './EditTask';
import StaticTask from './StaticTask';

class TaskItem extends Component{
	constructor(props){
		super(props);
		this.state = {isClicked : false}

		this.handleEdit= this.handleEdit.bind(this);
		this.quickComplete = this.quickComplete.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleEdit(){
		this.setState({isClicked: true});
	}

	handleRemove(){
		this.setState({isClicked: false});
	}

	quickComplete(){

	}

	render(){
		var content = null;
		if(this.state.isClicked == true){
			content = <EditTask
							task={this.props.task} 
							remove={this.handleRemove} 
							labels={this.props.labels}
							label={this.props.label}
							updateTasks={this.props.updateTasks}/>
		}else{
			content = <StaticTask 
						task={this.props.task} 
						label={this.props.label} 
						onClick={this.handleEdit} 
						username={this.props.username}
						showDate={this.props.showDate}
						updateTasks={this.props.updateTasks}/>;
		}
		return(
			<div className="TaskItem">
				{content}
			</div>
		)
	}
}

export default TaskItem;