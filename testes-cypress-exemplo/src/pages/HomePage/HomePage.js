import React, { useContext, useState } from 'react'
import Header from '../../components/Header/Header'
import GlobalContext from '../../context/GlobalContext'
import Card from '../../components/Card/Card'
import { HomePageContainer } from './HomePage.styled'

function HomePage() {
  const { dogs, fetchDogs, favorites } = useContext(GlobalContext)
  const [ search, setSeatch ] = useState("")

  const onChangeSearch = (e) => {
    setSeatch(e.target.value)
  }

  return (
    <HomePageContainer>
      <Header />
      <div>
        <button data-testeid='regenerate-button' onClick={fetchDogs}>Gerar novamente</button>
        <input
          data-testId="filter-breed-input"
          name="search"
          type="text"
          value={search}
          onChange={onChangeSearch}
          placeholder="Digite uma raça"
          autoComplete="off"
        />
      </div>

      <div id='card-grid'>
        {dogs
          .filter((dog) => !favorites.some((favoritedDog) => dog.id === favoritedDog.id))
          .filter((dog) => dog.breed.includes(search))
          .map((dog) => {
            return (
              <Card dog={dog} key={dog.id} />
            )
        })}
      </div>
    </HomePageContainer>
  )
}

export default HomePage