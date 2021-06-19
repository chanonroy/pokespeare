import shakespeareImg from '../../images/shakespeare.svg'
import pokeballImg from '../../images/pokeball.svg'

export default function HeroImage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          alt='shakespeare'
          src={shakespeareImg}
          height={75}
          width={75}
          style={{ marginRight: 20 }}
        />
        <img alt='pokeball' src={pokeballImg} height={75} width={75} />
      </div>
    </>
  )
}
