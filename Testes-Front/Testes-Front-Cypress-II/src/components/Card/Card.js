import React, { useContext } from 'react'
import { CardContainer } from './Card.styled'
import GlobalContext from '../../context/GlobalContext'
import { useLocation } from 'react-router-dom'

function Card({ dog }) {
  const location = useLocation()
  const { addToFavorites, removeFromFavorites } = useContext(GlobalContext)

  const renderCardButton = () => {
    switch(location.pathname) {
      case "/":
        return <button onClick={() => addToFavorites(dog)}>Favoritar</button>
      case "/favorites":
        return <button onClick={() => removeFromFavorites(dog)}>Remover</button>
      default:
        return <></>
    }
  }

  return (
    <CardContainer className="card">
      <p data-breedTestId='test-breed-card'>{dog.breed}</p>
      <img src={dog.url} alt={`Um cachorro aleatório da raça ${dog.breed}`} />
      {renderCardButton()}
    </CardContainer>
  )
}

export default Card