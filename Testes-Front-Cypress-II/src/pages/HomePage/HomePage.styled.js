import styled from "styled-components"

export const HomePageContainer = styled.div`
  input {
    margin-left: 32px;
  }

  > div > button {
    background-color: #fafafa;
    text-decoration: underline;
    padding: 6px;

    &:active {
      filter: brightness(0.7);
    }
  }
  
  #card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
`