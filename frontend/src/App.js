import React from 'react';
import { Route } from 'react-router-dom';

import SignUp from './components/Form/SignUp/SignUp';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/signUp" component={SignUp} />
    </React.Fragment>
  );
}

export default App;
