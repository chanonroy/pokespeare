import React from 'react'
import Container from '../../components/container'
import TextInput from '../../components/text-input'
import shakespeareImg from '../../images/shakespeare.svg'

export default function Home() {
	return (
		<Container style={{ paddingTop: 40, paddingBottom: 40 }}>
			{/* <img alt='shakespeare' src={shakespeareImg} height={50} width={50} /> */}
			<TextInput placeholder='login' />
		</Container>
	)
}
