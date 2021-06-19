import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colors } from '../../@types'
import { MagnifyingGlass } from '@styled-icons/entypo'
import ActivityIcon from '../activity-icon'

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
  padding: 0 10px 0 50px;
  outline: none;
  user-select: none;
  border-color: #dcdfe6;
  box-sizing: border-box;
  box-shadow: 0px 5px 15px rgb(59 59 59 / 5%);

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
  loading,
  ...props
}: {
  loading?: boolean
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {loading ? (
        <ActivityIcon
          style={{
            position: 'absolute',
            color: 'lightgrey',
            top: 10,
            left: 20,
          }}
        />
      ) : (
        <MagnifyingGlass
          style={{
            position: 'absolute',
            color: 'lightgrey',
            top: 10,
            left: 20,
            height: 20,
          }}
        />
      )}
      <StyledSearchBar {...props} />
    </div>
  )
}
