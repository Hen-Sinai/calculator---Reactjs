import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cube from './Cube';
import { asm } from '../features/result';

const wrapperStyle = {
	marginLeft: '38%',
	width: 'auto',
};

const KeyStyle = {
	display: 'grid',
	gridTemplateColumns: 'auto auto auto auto',
	backgroundColor: '#2196F3',
	padding: '10px',
	width: '373px',
};

const KeyBoard = () => {
	const dispatch = useDispatch();
	const [expressions, setExpressions] = useState([]);
	const curRes = useSelector((state) => state.result.value);
	const keys = ['CL', 'DL', '√', '^', '7', '8', '9', '*', '4', '5', '6', '/', '1', '2', '3', '+', '=', '0', '.', '-'];
	const secondaryKeys = ['*', '/'];
	const thirdyKeys = ['+', '-'];

	function isNumeric(str) {
		if (typeof str != 'string') return false;
		return !isNaN(str) && !isNaN(parseFloat(str));
	}

	const fixArr = (copyArr, index, numOfOperands, res) => {
		let newArr = copyArr.slice(0, index);
		newArr[index - numOfOperands] = res;
		newArr = newArr.concat(copyArr.slice(index + 2, copyArr.length));
		return newArr;
	};

	const calc = () => {
		let index;
		let res;
		let copyArr = expressions;

		index = copyArr.findIndex((key) => key === '√');
		while (index !== -1) {
			res = Math.sqrt(copyArr[index + 1]);
			copyArr = fixArr(copyArr, index, 0, res);
			index = copyArr.findIndex((key) => key === '√');
		}

		index = copyArr.findIndex((key) => key === '^');
		while (index !== -1) {
			res = Math.pow(copyArr[index - 1], copyArr[index + 1]);
			copyArr = fixArr(copyArr, index, 1, res);
			index = copyArr.findIndex((key) => key === '^');
		}

		index = copyArr.findIndex((key) => secondaryKeys.includes(key));
		while (index !== -1) {
			copyArr[index] === '*'
				? (res = copyArr[index - 1] * copyArr[index + 1])
				: (res = copyArr[index - 1] / copyArr[index + 1]);
			copyArr = fixArr(copyArr, index, 1, res);
			index = copyArr.findIndex((key) => secondaryKeys.includes(key));
		}

		index = copyArr.findIndex((key) => thirdyKeys.includes(key));
		while (index !== -1) {
			copyArr[index] === '+'
				? (res = copyArr[index - 1] - -copyArr[index + 1])
				: (res = copyArr[index - 1] - copyArr[index + 1]);
			copyArr = fixArr(copyArr, index, 1, res);
			index = copyArr.findIndex((key) => thirdyKeys.includes(key));
		}

		return copyArr;
	};

	const manageInput = (exp) => {
		if (exp === '=') {
			const res = calc();
			setExpressions(res);
			dispatch(asm({ expression: res[0] }));
		} else if (exp === 'CL') {
			setExpressions([]);
			dispatch(asm({ expression: '' }));
		} else if (exp === 'DL') {
			if (expressions[expressions.length - 1].length > 1) {
				expressions[expressions.length - 1] = expressions[expressions.length - 1].slice(
					0,
					expressions[expressions.length - 1].length - 1
				);
				setExpressions(expressions);
				dispatch(asm({ expression: expressions }));
			} else {
				const newArr = expressions.slice(0, expressions.length - 1);
				setExpressions(newArr);
				dispatch(asm({ expression: newArr }));
			}
		} else if (
			expressions.length === 0 ||
			(!isNumeric(expressions[expressions.length - 1]) && expressions[expressions.length - 1] !== '.') ||
			(!isNumeric(exp) && exp !== '.')
		) {
			const newArr = expressions.concat([exp]);
			setExpressions(newArr);
		} else {
			const newArr = expressions;
			newArr[expressions.length - 1] = newArr[expressions.length - 1] + exp;
			setExpressions(newArr);
		}
		console.log(expressions);
	};

	return (
		<div style={wrapperStyle}>
			<div
				style={KeyStyle}
				onClick={(event) => {
					dispatch(asm({ expression: curRes.expression + event.target.id }));
					manageInput(event.target.id);
				}}
			>
				{keys.map((key) => {
					return (
						<div key={key}>
							<Cube sign={key} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default KeyBoard;
