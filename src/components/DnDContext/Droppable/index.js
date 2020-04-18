// import React, { Component } from 'react';
// import PropTypes from 'prop-types'

// export class Droppable extends Component {
		
// 	drop = e => {
// 		e.preventDefault()
// 		const data = e.dataTransfer.getData('transfer')
// 		e.target.appendChild(document.getElementById(data))
// 	}

// 	allowDrop = e => {
// 		e.preventDefault()
// 	}

// 	render(){
// 		return(
// 			<div id={this.props.id}
// 				onDrop={this.drop}
// 				onDragOver={this.allowDrop}
// 				style={this.props.style}
// 			>
// 				{this.props.children}
// 			</div>
// 		);
// 	}
// }

// Droppable.propTypes = {
// 	id: PropTypes.string,
// 	style: PropTypes.object,
// 	children: PropTypes.node,
// }

import React from 'react';

export function Drop(props) {
	
	const drop = e => {
		e.preventDefault();
		const card_id = e.dataTransfer.getData('card_id');

		const card = document.getElementById(card_id);
		card.style.display = 'block';

		e.target.appendChild(card);
	}

	const dragOver = e => {
		e.preventDefault();
	}
	
	return(
		<div
			id={props.id}
			className={props.className}
			onDrop={drop}
			onDragOver={dragOver}
		>
			{props.children}
		</div>
	);
}