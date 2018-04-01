import React, { Component } from 'react';
import './stylesheets/Board.css';
import TaskItem from './TaskItem';
import {Button} from 'semantic-ui-react';

class Board extends Component{
	constructor(props){
		super(props);

		//dateSorted is set to 0 if not sorted, 1 sorted in ascending order, 2 in descending order
		this.state = {
			sortedBy: "date",
			dateSorted: 2,
			completionSorted: 2
		}

		this.handleDateSortClicked = this.handleDateSortClicked.bind(this);
		this.handleSortLabel = this.handleSortLabel.bind(this);
		this.handleSortCompletion = this.handleSortCompletion.bind(this);
	}

	handleDateSortClicked(){
		const dateSorted = (this.state.dateSorted + 1)%2
		this.setState({dateSorted : dateSorted, sortedBy: "date"})
	}

	handleSortLabel(){
		this.setState({sortedBy: "label"})
	}

	handleSortCompletion(){
		const completionSorted = (this.state.completionSorted + 1)%2;
		this.setState({sortedBy: "completion", completionSorted: completionSorted})
	}


	render(){
		var tasks = this.props.tasks;
		console.log(tasks);
		if (this.state.sortedBy === "date"){
			if(this.state.dateSorted == 1){
				tasks = tasks.sort(function(a,b){
					const keyA = new Date(a.due_date);
					const keyB = new Date(b.due_date);

					if(keyA < keyB) return -1;
					if(keyA > keyB) return 1;
					return 0;
				});
			}else if (this.state.dateSorted == 0){
				tasks = tasks.sort(function(a,b){
					const keyA = new Date(a.due_date);
					const keyB = new Date(b.due_date);

					if(keyA > keyB) return -1;
					if(keyA < keyB) return 1;
					return 0;
				});
			}
		}else if (this.state.sortedBy === "completion"){
			if(this.state.completionSorted == 1){
				tasks = tasks.sort(function(a,b){
					const keyA = (a.actual_times.last()/a.estimated_time);
					const keyB = (b.actual_times.last()/b.estimated_time);

					if(keyA > keyB) return -1;
					if(keyA < keyB) return 1;
					return 0;
				})
			}else if(this.state.completionSorted == 2){
				tasks = tasks.sort(function(a,b){
					const keyA = (a.actual_times.last()/a.estimated_time);
					const keyB = (b.actual_times.last()/b.estimated_time);

					if(keyA < keyB) return -1;
					if(keyA > keyB) return 1;
					return 0;
				})
			}
		}else if (this.state.sortedBy === "label"){
			tasks = tasks.sort(function(a,b){
				if (a.label < b.label) return -1;
				if (b.label < a.label) return 1;
				return 0;
			})
		}
		const taskItems = tasks.map(t => 
			<TaskItem 
				className="boardItem"
				task={t} 
				label={this.props.label_ids[t.label]} 
				labels={this.props.labels} 
				username={this.props.username} 
				showDate={true}
				updateTasks={this.props.updateTasks}/>
		)
		return(
			<div className="Board">
				<Button.Group>
					<Button onClick={this.handleDateSortClicked}> Date </Button>
					<Button onClick={this.handleSortLabel}> Label </Button>
					<Button onClick={this.handleSortCompletion}> Percent </Button>
				</Button.Group>
				{taskItems}
			</div>
		)
	}
}

export default Board;