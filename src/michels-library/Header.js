import React, { Component } from 'react';
import './stylesheets/Header.css';

class Header extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="Header">
				<button onClick={this.props.handleMenuClick}> Menu </button>
			</div>
		)
	}
}

export default Header;