import React from 'react';

const style = {
	backgroundColor: 'rgba(255, 255, 255, 0.8)',
	border: '1px solid rgba(0, 0, 0, 0.8)',
	padding: '20px',
	fontSize: '30px',
	textAlign: 'center',
	width: '92px',
	height: '70px',
};

const Cube = ({ sign }) => {
	return (
		<button id={sign} style={style}>
			{sign}
		</button>
	);
};

export default Cube;
