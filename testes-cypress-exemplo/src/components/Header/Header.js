import React from 'react'
import { HeaderContainer } from './Header.styled'
import { useLocation, useNavigate } from 'react-router-dom'
import { goToFavoritesPage, goToHomePage } from '../../routes/coordinator'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const renderNavButton = () => {
    switch (location.pathname) {
      case "/":
        return <button onClick={() => goToFavoritesPage(navigate)} data-testid="go-to-favorites-button">Ver favoritos</button>
      case "/favorites":
        return <button onClick={() => goToHomePage(navigate)} data-testid="go-to-homepage-button">Ir para Homepage</button>
      default:
        return <></>
    }
  }

  return (
    <HeaderContainer>
      <h1 id="teste-titulo">Dog CEO - gerador de dogs aleatórios</h1>
      {renderNavButton()}
    </HeaderContainer>
  )
}

export default Header