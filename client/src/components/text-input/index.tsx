import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	line-height: 20px;
	height: 25px;
	padding: 10px 15px;
	outline: none;
	user-select: none;

	&:hover {
		border: 1px solid lightgrey;
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
