import React, { Component } from 'react';
import './stylesheets/LoginPage.css';
import axios from 'axios';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

class LoginPage extends Component{
	constructor(props){
		super(props);

		this.state = {
			username : "",
			password: "",
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
		axios({url:'http://34.217.32.176:8000/users/logout', method: 'post', withCredentials: true}).then(
			res =>{
				console.log(res);
			})
		.catch((res =>{
			console.log(res);
		}))
	}

	validateForm(){
		return this.state.username.length > 0&& this.state.password.length > 0;
	}

	handleChange = event=>{
		this.setState({
			[event.target.id] : event.target.value
		});
	}

	handleSubmit(e){
		e.preventDefault();

		axios({url:'http://34.217.32.176:8000/users/login', data:{ username: this.state.username, password : this.state.password}, method: 'post', withCredentials: true}).then(
			res =>{
				const username = res.data;
				this.props.updateUsername(this.state.username);
				this.props.history.push('/');
				console.log(username);
			})
		.catch((res =>{
			
			console.log(res);
			// console.log(error);
		}))
	}


	render(){

		return(
			<div className="LoginPage">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="username" bsSize="large">
						<ControlLabel>Username</ControlLabel>
						<FormControl
							autoFocus
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							value={this.state.password}
							type="password"
							onChange={this.handleChange}
						/>
					</FormGroup>
					<Button
						block
						bsSize="large"
						disabled={!this.validateForm()}
						type="submit"
					>
						Login
					</Button>
				</form>
			</div>
		)
	}
}

export default LoginPage;