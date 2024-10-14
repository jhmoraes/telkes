import { useEffect, useState } from 'react'
import GlobalContext from './GlobalContext'
import axios from 'axios'
import { BASE_URL, TOKEN_NAME } from '../constants/constants'
import { createDogObjectFromUrl } from '../utils/utils'

const GlobalState = ({ children }) => {
  const [ dogs, setDogs ] = useState([])
  const [ favorites, setFavorites ] = useState([])

  useEffect(() => {
    fetchDogs()
    checkLocalStorageForFavorites()
  }, [])

  const fetchDogs = () => {
    axios.get(BASE_URL + "/10") // API retorna 10 urls de imagens de dogs
    .then((res) => {
      const urls = res.data.message
  
      const dogs = urls.map(url => {
        return createDogObjectFromUrl(url) // veja a pasta ./utils para entender
      })

      setDogs(dogs)
    })
    .catch((err) => {
      console.log("Erro ao buscar a lista de dogs")
      console.log(err)
    })
  }

  const checkLocalStorageForFavorites = () => {
    const favoritesJSON = window.localStorage.getItem(TOKEN_NAME)
    
    if (favoritesJSON) {
      const savedFavorites = JSON.parse(favoritesJSON)
      setFavorites(savedFavorites)
    }
  }

  const addToFavorites = (dog) => {
    const newFavorites = [...favorites]
    newFavorites.push(dog)

    setFavorites(newFavorites)
  }

  const removeFromFavorites = (dogToRemove) => {
    const filteredFavorites = favorites.filter((dog) => {
      return dog.id !== dogToRemove.id
    })

    setFavorites(filteredFavorites)
  }

  const saveInLocalStorage = () => {
    if (favorites.length > 0) {
      const favoritesJSON = JSON.stringify(favorites)
      window.localStorage.setItem(TOKEN_NAME, favoritesJSON)
    }
  }

  const clearLocalStorage = () => {
    window.localStorage.clear(TOKEN_NAME)
  }

  const data = {
    dogs,
    favorites,
    fetchDogs,
    addToFavorites,
    removeFromFavorites,
    saveInLocalStorage,
    clearLocalStorage
  }

  return (
    <GlobalContext.Provider value={data}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalState