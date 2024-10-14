import styled from "styled-components"

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  button {
    background-color: #fafafa;
    text-align: center;
    padding: 8px;
    border: 1px solid gray;

    &:hover {
      filter: brightness(0.96);
    }
  }
`