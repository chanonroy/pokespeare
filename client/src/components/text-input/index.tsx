import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colors } from '../../@types'

const StyledInput = styled.input<{ error?: boolean }>`
	border-radius: 4px;
	border: 1px solid;
	line-height: 20px;
	font-size: 14px;
	height: 25px;
	padding: 10px 15px;
	outline: none;
	user-select: none;
	border-color: ${({ error }) => (error ? Colors.danger : '#dcdfe6')};

	&:hover {
		border: 1px solid lightgrey;
	}

	&:focus {
		border: 1px solid #409eff;
	}
`

export default function TextInput({
	...props
}: { error?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
	return <StyledInput {...props} />
}
