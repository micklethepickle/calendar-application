import React, { Component } from 'react';
import './stylesheets/Board.css';
import TaskItem from './TaskItem';

class Board extends Component{
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
			<TaskItem 
				task={t} 
				label={this.props.label_ids[t.label]} 
				labels={this.props.labels} 
				username={this.props.username} 
				showDate={true}
				updateTasks={this.props.updateTasks}/>
		)
		return(
			<div className="Board">
				<button className="dateSortBtn" onClick={this.handleDateSortClicked}> Sort by date </button>
				{taskItems}
			</div>
		)
	}
}

export default Board;