import React, { useContext } from 'react'
import Header from '../../components/Header/Header'
import GlobalContext from '../../context/GlobalContext'
import { FavoritesPageContainer } from './FavoritesPage.styled'
import Card from '../../components/Card/Card'

function FavoritesPage() {
  const { favorites, saveInLocalStorage, clearLocalStorage } = useContext(GlobalContext)

  return (
    <FavoritesPageContainer>
      <Header />

      <div>
        <button onClick={saveInLocalStorage}>Salvar no local storage</button>
        <button onClick={clearLocalStorage}>Limpar local storage</button>
      </div>

      <div id='card-grid'>
        {favorites.map((dog) => {
          return (
            <Card dog={dog} key={dog.id} />
          )
        })}
      </div>
    </FavoritesPageContainer>
  )
}

export default FavoritesPage