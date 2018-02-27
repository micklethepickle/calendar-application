import React, { Component } from 'react';
import './stylesheets/AddLabel.css';

class AddLabel extends Component{
	constructor(props){
		super(props);
	}

	render(){

		return(
			<div className="LabelItem" onClick={this.props.addLabel}>
				+
			</div>
		)
	}
}

export default AddLabel;