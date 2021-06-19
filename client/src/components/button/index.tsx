import styled from 'styled-components'

const Button = styled.button`
	display: block;
	cursor: pointer;
	border: 1px solid #409eff;
	background-color: #409eff;
	box-shadow: none;
	color: white;
	border-radius: 5px;
	padding: 12px 20px;
	transition: all 0.1s ease;
	outline: none;

	&:hover {
		background-color: #66b1ff;
		border-color: #66b1ff;
	}

	&:active {
		background-color: #409eff;
		background-color: #409eff;
	}

	&:focus {
		border-color: #66b1ff;
	}
`

export default Button
