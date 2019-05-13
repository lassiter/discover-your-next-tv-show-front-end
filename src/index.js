import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Page from './Page'
import NotFound from './404'
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT } from './constants';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    overflow-x: hidden;
  }

  .loader:empty {
    position: absolute;
    top: calc(50% - 4em);
    left: calc(50% - 4em);
    width: 6em;
    height: 6em;
    border: 1.1em solid rgba(0, 0, 0, 0.2);
    border-left: 1.1em solid #000000;
    border-radius: 50%;
    animation: load8 1.1s infinite linear;
  }
  
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .modal-video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .modal-video-body {
    height: 100vw;
    width: 100vw;
    margin: auto;
    display: block;
    position: fixed;
    z-index: 1000;
    background: rgba(255,255,255, .75);
  }

  .modal-video-inner {
    margin: auto;
    display: block;
    position: relative;
    width: 50vw;
    height: 20%;
    top: 130px;
  }

  .modal-video-movie-wrap {
    padding-bottom: 56.25%;
    width: fit-content;
    margin: 0 auto;
  }

  .modal-video-close-btn {
    display: none;
  }

  .react-autosuggest__container, .react-autosuggest__input, .react-autosuggest__suggestions-container {
    width: 100vw;
    margin: 0 0 10px 0;
  }

  .react-autosuggest__input {
    height: 50px;
  }
  
  .react-autosuggest__suggestions-list {
    list-style-type: none;
  }

  .react-autosuggest__suggestion {

  } 

  .react-autosuggest__suggestion--first {

  }
`

const routes = (
  <>
    <GlobalStyle/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/404" component={NotFound} />
        <Route path="/:slug" component={Page} />
      </Switch>
    </BrowserRouter>
  </>
);

ReactDOM.render(
  routes,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
