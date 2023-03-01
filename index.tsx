import React from 'react';
import { registerRootComponent } from 'expo';

import Entry from './src/pages';

function App() {
  return <Entry />;
}

registerRootComponent(App);
