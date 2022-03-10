import React from 'react';

import Main from './pages/Main';
import Store from './shared/context';

const App: React.FC = () => (
  <Store>
    <Main />
  </Store>
);

export default App;
