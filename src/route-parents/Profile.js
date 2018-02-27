import React, { Component } from 'react';
import './stylesheets/Profile.css';
import LabelsCard from '../profile-components/LabelsCard';

class Profile extends Component{
	constructor(props){
		super(props);
	}


	onAddLabel(){
	}
	render(){
		return(
			<div className="Profile">
				Profile {this.props.username}
				<LabelsCard labels={this.props.labels} addLabel={this.props.addLabel} username={this.props.username} updateLabels={this.props.updateLabels}/>
			</div>
		)
	}
}

export default Profile;