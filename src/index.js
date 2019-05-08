import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Page from './Page'
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT } from './constants';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
  }
`

const routes = (
  <>
    <GlobalStyle/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
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
