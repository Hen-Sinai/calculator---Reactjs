import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// //import { actions } from '../features/user';

const wrapperStyle = {
	marginTop: '60px',
	border: '1px solid rgba(0, 0, 0, 0.8)',
	width: '390px',
	height: '80px',
	marginLeft: '38%',
	backgroundColor: '#0095ff40',
};

const resStyle = {
	textAlign: 'center',
};

const Screen = () => {
	const curRes = useSelector((state) => state.result.value);
	return (
		<div style={wrapperStyle}>
			<h1 style={resStyle}>{curRes.expression}</h1>
		</div>
	);
};

export default Screen;
