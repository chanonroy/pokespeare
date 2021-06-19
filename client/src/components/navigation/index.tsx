import { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../providers/AuthProvider'
import Container from '../container'

const OuterNav = styled.div`
  width: 100%;
`

const InnerNav = styled.div`
  display: flex;
  justify-content: space-between;
`

const NavLink = styled.a`
  margin-right: 5px;
`

export default function Navigation() {
  const { loggedIn, logout } = useContext(AuthContext)

  return (
    <OuterNav>
      <Container style={{ alignSelf: 'center' }}>
        <InnerNav>
          <div>Pokespeare</div>
          <div>
            <NavLink href='/saved'>Saved</NavLink>
            {loggedIn ? (
              <NavLink onClick={logout}>Logout</NavLink>
            ) : (
              <NavLink href='/login'>Login</NavLink>
            )}
          </div>
        </InnerNav>
      </Container>
    </OuterNav>
  )
}
