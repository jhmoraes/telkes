import styled from "styled-components"

export const CardContainer = styled.div`
  width: 250px;
  height: 400px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: contain;
  }

  button {
    width: 100%;
    text-align: center;
    padding: 8px;

    &:hover {
      filter: brightness(0.8);
    }

    &:active {
      filter: brightness(0.9);
    }
  }
`