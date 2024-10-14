import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  html {
    font-family: 'Poppins', sans-serif;
    background-color: #fff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root {
    margin: 0 auto;
    max-width: 1200px;
  }

  button,
  input[type="button"],
  input[type="submit"],
  input[type="reset"] {
    appearance: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: 100%;
  }

  button {
    background-color: #dedede;
  }

  input {
    padding: 4px 6px;
    border: 1px solid black;
    outline: none;
  }
`