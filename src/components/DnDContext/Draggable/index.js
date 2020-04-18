// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// export class Draggable extends Component {
	
// 	drag = e => {
// 		e.preventDefault();
// 		e.dataTransfer.setData('transfer', e.target.id)
// 	}
	
// 	noAllowDrop = e => {
// 		e.stopPropagation();
// 	}

//  render(){
// 	 return(
// 		 <div
// 			 id={this.props.id}
// 			 draggable="true"
// 			 onDragStart={this.drag}
// 			 onDragOver={this.noAllowDrop}
// 			 style={this.props.style}
// 		 >
// 			 {this.props.children}
// 		 </div>
// 	 );
//  }
// }

// Draggable.propTypes = {
// 	id: PropTypes.string,
// 	style: PropTypes.object,
// 	children: PropTypes.node,
// }


import React from 'react';

export function Drag(props) {

	const dragStart = e => {
		const target = e.target

		e.dataTransfer.setData('card_id', target.id)

		setTimeout(() => {
			target.style.display = 'none';
		}, 0);
	}
	
	const dragOver = e => {
		e.preventDefault();
	}

	return(
		<div
			id={props.id}
			className={props.className}
			draggable={props.draggable}
			onDragStart={dragStart}
			onDragOver={dragOver}
		>
			{props.children}
		</div>
	);
}