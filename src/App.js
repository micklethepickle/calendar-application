import React, { Component } from 'react';
import './App.css';
import SideNav from 'react-simple-sidenav';
import Header from './michels-library/Header';
import axios from 'axios';
import Home from './route-parents/Home';
import Profile from './route-parents/Profile';
import LoginPage from './route-parents/LoginPage';

import {
	Route,
	NavLink,
	HashRouter,
	Redirect
} from "react-router-dom";

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			showNav: false,
			tasks: [], 
			dayToTasks: {},
			dayToWork: {},
			labels: [],
			loginPage: false
		}

		this.handleOpenSideNav = this.handleOpenSideNav.bind(this);
		this.handleHideSideNav = this.handleHideSideNav.bind(this);

		this.updateTasks = this.updateTasks.bind(this);
		this.updateLabels = this.updateLabels.bind(this);
		this.updateUsername = this.updateUsername.bind(this);
	}

	componentWillMount(){
		axios({url:'http://34.217.32.176:8000/users/login', method: 'post', withCredentials: true}).then(
			res =>{
				const username = res.data;
				axios.get('http://34.217.32.176:8000/labels/user/' + username).then(
				res => {
					var labels = res.data;

					var label_ids = {}
					labels.map((l) =>{
						label_ids[l._id] ={ name: l.name, color: l.color};
					})
					label_ids["5a8baca35a4aa45e7a3c5d08"] = {name: '', color: ''}

					axios.get('http://34.217.32.176:8000/tasks/user/' + username).then( res => {
						const tasks = res.data.tasks;
						const dayToWork = res.data.dayToWork;
						const dayToTasks = this.remapDayToTasks(tasks);
						this.setState({ username: username, tasks : tasks, dayToTasks: dayToTasks, labels: labels, label_ids: label_ids, loginPage: false, dayToWork : dayToWork})
				})
			})
		})
		.catch((res =>{
			this.setState({loginPage : true});
			// console.log(error);
		}))

	}

	updateTasks(){

		axios.get('http://34.217.32.176:8000/tasks/user/' + this.state.username).then( res => {
			const tasks = res.data.tasks;
			const dayToTasks = this.remapDayToTasks(tasks);
			const dayToWork = res.data.dayToWork;
			this.setState({ tasks : tasks, dayToTasks: dayToTasks, dayToWork : dayToWork})
		})
		.catch((error =>{
			console.log('error 3 ' + error);
		}));
	}

	updateLabels(){
		axios.get('http://34.217.32.176:8000/labels/user/' + this.state.username).then(
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

	updateUsername(username){
		this.setState({username: username, loginPage: false});
		this.updateTasks();
		this.updateLabels();
	}

  	render() {
  		const homeItem = <NavLink to='/'>Home</NavLink>;
  		const profileItem = <NavLink to='/profile'>Profile</NavLink>;
  		const statsItem = <NavLink to='/stats'>Stats</NavLink>;

  		console.log(this.state.dayToWork);
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
		      				this.state.loginPage ? <Redirect to="/login" /> :
		      				<Home {...props} 
		      					tasks={this.state.tasks} 
		      					dayToTasks={this.state.dayToTasks}
		      					dayToWork={this.state.dayToWork}
		      					labels={this.state.labels}
		      					label_ids={this.state.label_ids}
		      					username={this.state.username}
		      					updateTasks={this.updateTasks}/>}
		      				/>
		      			<Route path="/profile" render={(props) => 
		      				this.state.loginPage ? <Redirect to="/login" /> : 
		      				<Profile {...props} 
		      					username={this.state.username}
		      					labels={this.state.labels}
		      					updateLabels={this.updateLabels}/>} 
		      				/>
		      		</div>

		      		<div className="login-card">
		      			<Route path="/login" render={(props) =>
		      				<LoginPage {...props}
		      					updateUsername={this.updateUsername}
		      				/>
		      			}/>
		      		</div>
		      	</div>
	      	</HashRouter>
	    );
  	}
}

export default App;
