import styled from 'styled-components'
import { Colors } from '../../@types'

const Button = styled.button`
  display: block;
  position: 'relative';
  cursor: pointer;
  border: 1px solid ${Colors.primary};
  background-color: ${Colors.primary};
  box-shadow: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  padding: 12px 20px;
  transition: all 0.1s ease;
  outline: none;

  &:hover {
    background-color: ${Colors.primaryAccent};
    border-color: ${Colors.primaryAccent};
  }

  &:active {
    background-color: ${Colors.primary};
    background-color: ${Colors.primary};
  }

  &:focus {
    border-color: ${Colors.primaryAccent};
  }
`

export default Button
