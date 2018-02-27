import React, { Component } from 'react';
import './stylesheets/AddingLabel.css';
import axios from 'axios';
import { Button, ButtonGroup, Popover, OverlayTrigger } from 'react-bootstrap';
import { BlockPicker , SketchPicker} from 'react-color';

class AddingLabel extends Component{
	constructor(props){
		super(props);
		this.state = {
			labelName: '',
			curColor: "#FFFFFF"
		}

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNameChange(e){
		this.setState({labelName: e.target.value})
	}

	handleColorChange(color, event){
		this.setState({curColor: color.hex})
	}

	handleSubmit(){
		const newLabel={
			username: this.props.username,
			name: this.state.labelName,
			color: this.state.curColor
		}

		axios.post('http://localhost:8000/labels', newLabel).then( response => {
	  			this.props.updateLabels();
	  			this.props.handleConfirm();
	  		})
	  		.catch( error =>{
	  			console.log(error)
	  		})
	}

	render(){
		const blockPicker = <BlockPicker 
								color={this.state.curColor}
								triangle="hide"
								onChangeComplete={this.handleColorChange}
								/>
		const colorPicker = <Popover id="colorpicker" title="pick color" > {blockPicker}</Popover>

		return(
			<div className="LabelItem AddingLabel">
				<OverlayTrigger trigger="click" placement="bottom" overlay={colorPicker}>
					<div className="currentColor flex-item" style={{backgroundColor:this.state.curColor}} onClick={this.colorClicked}></div>
				</OverlayTrigger>
				<input className="nameInput flex-item" type="text" placeholder="Label name" value={this.state.labelName} onChange={this.handleNameChange} />
				<ButtonGroup className="flex-item">
					<Button bsStyle="success" bsSize="xs" type="submit" onClick={this.handleSubmit}> + </Button>
					<Button bsStyle="danger" bsSize="xs" onClick={this.props.handleCancel} > x </Button>
				</ButtonGroup>
			</div>
		)
	}
}

export default AddingLabel;