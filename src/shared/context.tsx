import React, { createContext, useState } from 'react';

type ContextState = {
  keyPressed: string;
};

type ContextProps = [
  ContextState,
  React.Dispatch<React.SetStateAction<ContextState>>,
];

const initialState: ContextState = {
  keyPressed: '',
};

const Store: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext<ContextProps>({} as ContextProps);

export default Store;
