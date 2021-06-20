import styled from 'styled-components'
import { Colors } from '../../@types'
import { ThumbUp, ThumbDown } from '@styled-icons/heroicons-solid'
import SecondaryButton from '../secondary-button'

const StyledCard = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(59, 59, 59, 0.05);
  margin-bottom: 20px;
  box-sizing: border-box;
`

export default function PokemonCard({
  id,
  name,
  description,
  saved,
  onSave,
  onUnsave,
}: {
  id: string
  name: string
  description: string
  saved: boolean
  onSave?: () => void
  onUnsave?: () => void
}) {
  return (
    <StyledCard>
      <div>
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          height={50}
          style={{ marginRight: 20 }}
        />
      </div>
      <div style={{ width: '100%' }}>
        <div
          style={{ fontWeight: 'bold', color: Colors.dark, marginBottom: 10 }}
        >
          <span style={{ marginRight: 5 }}>{name}</span>
          <span style={{ color: 'darkgrey' }}>#{id}</span>
        </div>
        <div style={{ color: 'darkgrey', marginBottom: 20 }}>{description}</div>

        {saved ? (
          <SecondaryButton onClick={onUnsave}>
            <ThumbDown height={15} style={{ height: 15, marginRight: 5 }} />
            Remove
          </SecondaryButton>
        ) : (
          <SecondaryButton onClick={onSave}>
            <ThumbUp height={15} style={{ height: 15, marginRight: 5 }} />
            Save
          </SecondaryButton>
        )}
      </div>
    </StyledCard>
  )
}
