import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colors } from '../../@types'
import { MagnifyingGlass } from '@styled-icons/entypo'

const SEARCH_BAR_HEIGHT = 40

const StyledSearchBar = styled.input<{ error?: boolean }>`
  display: block;
  border-radius: 50px;
  border: 1px solid;
  line-height: 20px;
  font-size: 14px;
  height: ${SEARCH_BAR_HEIGHT}px;
  width: 100%;
  margin-bottom: 40px;
  padding: 0 10px 0 45px;
  outline: none;
  user-select: none;
  border-color: #dcdfe6;
  box-sizing: border-box;

  &:hover {
    border: 1px solid lightgrey;
  }

  &:focus {
    border: 1px solid ${Colors.primary};
  }

  &::placeholder {
    color: lightgrey;
  }
`

export default function SearchBar({
  ...props
}: { error?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <MagnifyingGlass
        height={20}
        style={{
          position: 'absolute',
          color: 'lightgrey',
          top: 10,
          left: 20,
        }}
      />
      <StyledSearchBar {...props} />
    </div>
  )
}
