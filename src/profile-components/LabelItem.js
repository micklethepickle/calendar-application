import React, { Component } from 'react';
import './stylesheets/LabelItem.css';

class LabelItem extends Component{
	constructor(props){
		super(props);
	}

	render(){

		return(
			<div className="LabelItem" style={{backgroundColor:this.props.label.color}}>
				{this.props.label.name}
			</div>
		)
	}
}

export default LabelItem;