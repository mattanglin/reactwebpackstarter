/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { useScroll } from 'react-router-scroll';

import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

console.log(useScroll);
const client = new ApiClient();
const scrollBrowserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(scrollBrowserHistory, client, window.__data);
const history = syncHistoryWithStore(scrollBrowserHistory, store);

const component = (
  <Router
    render={(props) =>
      <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />
    } history={history}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
