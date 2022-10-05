import React from 'react';
import {
  BrowserRouter as Router,
  Route, NavLink, Switch,
} from 'react-router-dom';

import requireAuth from '../hocs/requireAuth';

import AdminPanel from '../containers/adminPanel';
import SearchBar from '../containers/search/searchBar';
import SearchPane from '../containers/search/searchPane';
import SignUpPanel from '../containers/authentication/signUpPanel';
import SignInPanel from '../containers/authentication/signInPanel';
import SignOutPanel from '../containers/authentication/signOutPanel';

const Welcome = () => (
  <div>
    <NavLink to="/signin">Sign In</NavLink>
    <NavLink to="/signup">Sign Up</NavLink>
    <SearchBar />
    <SearchPane />
  </div>
);

const FallBack = () => <div>Uh oh... URL Not Found! Please contact the system administrator.</div>;

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/signin" component={SignInPanel} />
        <Route exact path="/signup" component={SignUpPanel} />
        <Route exact path="/signout" component={SignOutPanel} />
        <Route path="/admin" component={requireAuth(AdminPanel, SignInPanel)} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default App;
