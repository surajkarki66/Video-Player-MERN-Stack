import React from 'react';
import { Route } from 'react-router-dom';

import SignUp from './components/Form/SignUp/SignUp';
import SignIn from './components/Form/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/signOut" component={SignOut} />
    </React.Fragment>
  );
}

export default App;
