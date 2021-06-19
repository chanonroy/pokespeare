import shakespeareImg from '../../images/shakespeare.svg'
import trainerImg from '../../images/trainer.svg'

export default function HeroImage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          alt='pokeball'
          src={trainerImg}
          height={75}
          width={75}
          style={{ marginRight: 20 }}
        />
        <img alt='shakespeare' src={shakespeareImg} height={75} width={75} />
      </div>
    </>
  )
}
