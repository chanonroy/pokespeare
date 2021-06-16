import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	height: 35px;
	line-height: 40px;
	padding: 0 15px;
	outline: none;
	user-select: none;

	&:hover {
		border: 1px solid darkgrey;
	}

	&:focus {
		border: 1px solid #409eff;
	}
`

export default function TextInput({
	...props
}: InputHTMLAttributes<HTMLInputElement>) {
	return <StyledInput {...props} />
}
