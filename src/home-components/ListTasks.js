import React, { Component } from 'react';
import './stylesheets/ListTasks.css';
import SimpleTaskCard from './SimpleTaskCard';
import {Button} from 'semantic-ui-react';

class ListTasks extends Component{
	constructor(props){
		super(props);

		//dateSorted is set to 0 if not sorted, 1 sorted in ascending order, 2 in descending order
		this.state = {dateSorted: 2}

		this.handleDateSortClicked = this.handleDateSortClicked.bind(this);
	}

	handleDateSortClicked(){
		const dateSorted = (this.state.dateSorted + 1)%2
		this.setState({dateSorted : dateSorted})
	}


	render(){
		var tasks = this.props.tasks;
		console.log(tasks)

		if(this.state.dateSorted == 1){
			tasks = tasks.sort(function(a,b){
				console.log()
				const keyA = new Date(a.due_date);
				const keyB = new Date(b.due_date);

				if(keyA < keyB) return -1;
				if(keyA > keyB) return 1;
				return 0;
			});
		}else if (this.state.dateSorted == 0){
			console.log("sorting2")
			tasks = tasks.sort(function(a,b){
				const keyA = new Date(a.due_date);
				const keyB = new Date(b.due_date);

				if(keyA > keyB) return -1;
				if(keyA < keyB) return 1;
				return 0;
			});
			console.log(tasks)
		}
		const taskItems = tasks.map(t => 
			<SimpleTaskCard
				labels={this.props.labels}
				task={t} 
				label={this.props.label_ids[t.label]} 
				username={this.props.username}
				showDate={true}
				clickedTask={this.props.clickedTask}/>
		)
		return(
			<div className="ListTasks">
				<Button onClick={this.handleDateSortClicked}> Sort by date </Button>
				<div className="tasks">
					{taskItems}
				</div>
			</div>
		)
	}
}

export default ListTasks;