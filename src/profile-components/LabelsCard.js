import React, { Component } from 'react';
import './stylesheets/LabelsCard.css';
import LabelItem from './LabelItem';
import AddLabel from './AddLabel';
import AddingLabel from './AddingLabel';

class LabelsCard extends Component{
	constructor(props){
		super(props);
		this.state = {
			addingLabel : false
		}

		this.onAddLabel = this.onAddLabel.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
	}

	onAddLabel(){
		this.setState({
			addingLabel : true
		})
	}

	handleCancel(){
		this.setState({
			addingLabel: false
		})
	}

	handleConfirm(){
		this.setState({
			addingLabel : false
		})
	}

	render(){
		const listLabels = this.props.labels.map((l) =>
			<LabelItem label={l}/>
		)

		const addLabelItem = this.state.addingLabel ? 
		<AddingLabel handleCancel={this.handleCancel} handleConfirm={this.handleConfirm} updateLabels={this.props.updateLabels} username={this.props.username}/> : <AddLabel addLabel={this.onAddLabel} />;

		return(
			<div className="LabelsCard">
				LabelsCard
				{listLabels}
				{addLabelItem}
			</div>
		)
	}
}

export default LabelsCard;