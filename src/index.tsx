import React from 'react';

import Main from './pages/Main';
import Store from './shared/context';

const App = () => (
  <Store>
    <Main />
  </Store>
);

export default App;
