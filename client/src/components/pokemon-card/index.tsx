import { Heart, HeartFill } from '@styled-icons/octicons'
import styled from 'styled-components'

const StyledCard = styled.div`
	display: flex;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0px 5px 15px rgba(59, 59, 59, 0.05);
`

export default function PokemonCard({
	id,
	name,
	description,
	saved,
	onToggleSave,
}: {
	id: string
	name: string
	description: string
	saved: boolean
	onToggleSave?: () => void
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
			<div style={{ paddingRight: 20 }}>
				<div style={{ fontWeight: 'bold', marginBottom: 5 }}>
					<span style={{ marginRight: 5 }}>{name}</span>
					<span style={{ color: 'darkgrey' }}>#{id}</span>
				</div>
				<div style={{ color: 'darkgrey' }}>{description}</div>
			</div>
			<div>
				{saved ? (
					<HeartFill
						height={16}
						color={'#e74c3c'}
						style={{ cursor: 'pointer' }}
						onClick={onToggleSave}
					/>
				) : (
					<Heart
						height={16}
						color='darkgrey'
						style={{ cursor: 'pointer' }}
						onClick={onToggleSave}
					/>
				)}
			</div>
		</StyledCard>
	)
}
