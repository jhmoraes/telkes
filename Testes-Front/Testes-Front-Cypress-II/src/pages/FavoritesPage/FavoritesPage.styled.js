import styled from "styled-components"

export const FavoritesPageContainer = styled.div`
  button {
    padding: 6px;

    &:active {
      filter: brightness(0.9);
    }
  }

  > div > button:nth-child(1) {
    color: blue;
    background-color: #fafafa;
    text-decoration: underline;
  }

  > div > button:nth-child(2) {
    color: red;
    background-color: #fafafa;
    text-decoration: underline;
    margin-left: 32px;
  }

  #card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
`