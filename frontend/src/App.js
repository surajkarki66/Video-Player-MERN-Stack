import React from 'react';
import { Route } from 'react-router-dom';

import SignUp from './components/Form/SignUp/SignUp';
import SignIn from './components/Form/SignIn/SignIn';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
    </React.Fragment>
  );
}

export default App;
