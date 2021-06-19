import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const ActivityIcon = styled.div`
  display: block;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-left: 2px solid white;
  background: transparent;
  width: 15px;
  height: 15px;
  border-radius: 50%;
`

export default ActivityIcon
