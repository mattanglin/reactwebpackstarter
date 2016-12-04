import React from 'react';
import { IndexRoute, Route } from 'react-router';
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Subjects,
    NotFound
  } from 'containers';

/**
*  By returning routes as a function with the store as a parameter,
*  we can check auth state within a routes onEnter and redirect if
*  necessary
*/
// export default (store) => {
export default () => (
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Routes */ }
    <Route path="/subjects" component={Subjects} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
