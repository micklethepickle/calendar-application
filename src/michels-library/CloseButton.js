import React, { Component } from 'react';
import './stylesheets/CloseButton.css';

class CloseButton extends Component{
	constructor(props){
		super(props);

	}

	render(){
		return(
			<button className="CloseButton" onClick={this.props.onClick} />
		)
	}
}

export default CloseButton;