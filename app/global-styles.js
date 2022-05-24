import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Verdana', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #f5f1ed;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  span,
  button,
  label {
    font-family: sans-serif, Times, 'Times New Roman', serif;
    line-height: 1.5em;
    margin-bottom: 0;
  }

  .button {
    background-color: #666;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    color: #e9e9e9;
    box-shadow: 0 0 3px #555;
  }

  audio {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
    object-fit: contain;
  }
`;

export default GlobalStyle;
