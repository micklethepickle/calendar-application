import React, { Component } from 'react';
import './App.css';
import SideNav from 'react-simple-sidenav';
import Header from './michels-library/Header';
import axios from 'axios';
import Home from './route-parents/Home';
import Profile from './route-parents/Profile';

import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: "michelma",
			showNav: false,
			tasks: [], 
			dayToTasks: {},
			labels: []
		}

		this.handleOpenSideNav = this.handleOpenSideNav.bind(this);
		this.handleHideSideNav = this.handleHideSideNav.bind(this);

		this.updateTasks = this.updateTasks.bind(this);
		this.updateLabels = this.updateLabels.bind(this);
	}

	componentWillMount(){
		axios.get('http://34.217.32.176:8000/labels/user/' + this.state.username).then(
			res => {
				console.log("success");
				const labels = res.data;

				var label_ids = {}
				labels.map((l) =>{
					label_ids[l._id] ={ name: l.name, color: l.color};
				})
				label_ids["5a8baca35a4aa45e7a3c5d08"] = {name: '', color: ''}

				axios.get('http://34.217.32.176:8000/tasks/user/' + this.state.username).then( res => {
					const tasks = res.data;
					const dayToTasks = this.remapDayToTasks(tasks);
					this.setState({ tasks : tasks, dayToTasks: dayToTasks, labels: labels, label_ids: label_ids})
				})
			})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));

	}

	updateTasks(){

		axios.get('http://localhost:8000/tasks/user/' + this.state.username).then( res => {
			const tasks = res.data;
			const dayToTasks = this.remapDayToTasks(tasks);
			this.setState({ tasks : tasks, dayToTasks: dayToTasks})
		})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));
	}

	updateLabels(){
		axios.get('http://localhost:8000/labels/user/' + this.state.username).then(
			res => {
				const labels = res.data;

				var label_ids = {}
				labels.map((l) => {
					label_ids[l._id] = {name : l.name, color: l.color};
				})
				label_ids["5a8baca35a4aa45e7a3c5d08"] = {name: '', color: ''}
				this.setState({labels: labels, label_ids : label_ids})
			})
	}

	//Remaps list of tasks into an object where keys are the day, and value is
	//list of tasks
	//MAKE SURE TO CALL EVERYTIME TASKS IS UPDATED
	remapDayToTasks(tasks){
		const dayToTasks = {}
		tasks.map((t) => {
			const d_date = new Date(t.due_date);
			const day = d_date.getFullYear() + '-' + d_date.getMonth() + '-' + d_date.getDate();
			if (day in dayToTasks){
				var new_day = dayToTasks[day];
				new_day.push(t);
				dayToTasks[day] = new_day;
			}else{
				dayToTasks[day] = [t];
			}
		})
		return dayToTasks;
	}

	handleOpenSideNav(){
		this.setState({showNav: true});
	}

	handleHideSideNav(){
		this.setState({showNav: false});
	}

  	render() {
  		const homeItem = <NavLink to='/'>Home</NavLink>;
  		const profileItem = <NavLink to='/profile'>Profile</NavLink>;
  		const statsItem = <NavLink to='/stats'>Stats</NavLink>;

	    return (
	    	<HashRouter>
		      	<div className="App">
		      		<Header handleMenuClick={this.handleOpenSideNav} />
		      		<SideNav
		      			showNav={this.state.showNav}
		      			onHideNav={this.handleHideSideNav}
		      			title="Simple Side navigation bar"
		      			items={[
		      				homeItem,
		      				profileItem,
		      				'Stats'
		      				]}
		      			/>
		      		<div className="content">
		      			<Route exact path="/" render={(props) => 
		      				<Home {...props} 
		      					tasks={this.state.tasks} 
		      					dayToTasks={this.state.dayToTasks}
		      					labels={this.state.labels}
		      					label_ids={this.state.label_ids}
		      					username={this.state.username}
		      					updateTasks={this.updateTasks}/>}
		      				/>
		      			<Route path="/profile" render={(props) => 
		      				<Profile {...props} 
		      					username={this.state.username}
		      					labels={this.state.labels}
		      					updateLabels={this.updateLabels}/>} 
		      				/>
		      		</div>
		      	</div>
	      	</HashRouter>
	    );
  	}
}

export default App;
