import { css, Global } from '@emotion/react';
import { COLOR } from '../themes/color';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = css`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body,
  html,
  #__next {
    margin: 0;
    padding: 0;
    font-size: 16px;
    background-color: ${COLOR.GREY7};
    overflow: auto;
  }

  body {
    min-height: 100vh;
  }

  a {
    text-decoration: none;
  }

  main {
    display: block;
  }

  legend {
    display: table;
    float: left;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  legend + * {
    clear: both;
  }

  fieldset {
    border: 0;
    padding: 0.01em 0 0 0;
    margin: 0;
    min-width: 0;
  }

  body:not(:-moz-handler-blocked) fieldset {
    display: table-cell;
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    line-height: normal;
  }

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;
