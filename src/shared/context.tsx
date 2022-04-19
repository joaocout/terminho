import React, { createContext, useReducer } from 'react';

import type { GridBox } from '../shared/types';

type GridContextParams = {
  selectedBox: number;
  grid: GridBox[][];
  dispatch: React.Dispatch<Action>;
};

export enum Actions {
  SET_BOX_VALUE = 'SET_BOX_VALUE',
  SET_SELECTED = 'SET_SELECTED',
  NEXT_ROW = 'NEXT_ROW',
  NEXT_BOX = 'NEXT_BOX',
  PREV_BOX = 'PREV_BOX',
  RESET = 'RESET',
}

type Action = {
  type: Actions;
  payload?: string | number;
};

const initialGrid: Array<Array<GridBox>> = Array(6)
  .fill(Array(5).fill({ available: false, value: '' }))
  .map((item, index) => {
    if (index === 0) {
      // initializing first row with active boxes
      const arr: Array<GridBox> = Array(5).fill({ available: true, value: '' });
      return arr;
    }
    return item;
  });

type State = {
  selectedBox: number;
  grid: Array<Array<GridBox>>;
};

const initialState: State = {
  selectedBox: 0,
  grid: initialGrid,
};

const reducer = (prevState: State, action: Action): State => {
  const { type, payload } = action;
  const { selectedBox, grid } = prevState;

  switch (type) {
    case Actions.SET_BOX_VALUE: {
      const newGrid = grid.map((row, rowIndex) =>
        row.map((box, columnIndex) => {
          if (selectedBox === rowIndex * 5 + columnIndex) {
            if (typeof payload === 'string') {
              return { ...box, value: payload };
            }
            return box;
          }
          return box;
        }),
      );
      return { ...prevState, grid: newGrid };
    }

    case Actions.SET_SELECTED: {
      if (typeof payload === 'number') {
        return { ...prevState, selectedBox: payload };
      }
      return prevState;
    }

    case Actions.NEXT_ROW: {
      const selectedRowIndex = Math.min(Math.floor(selectedBox / 5), 4);
      const typedWord = grid[selectedRowIndex]
        .map((item) => item.value)
        .join('');

      if (typedWord.length === 5) {
        const newGrid = grid.map((row, rowIndex) => {
          if (rowIndex === selectedRowIndex) {
            return row.map((box) => ({ ...box, available: false }));
          }
          if (rowIndex === selectedRowIndex + 1) {
            return row.map((box) => ({ ...box, available: true }));
          }
          return row;
        });
        return { selectedBox: (selectedRowIndex + 1) * 5, grid: newGrid };
      }

      return prevState;
    }

    case Actions.NEXT_BOX: {
      if (selectedBox % 5 < 4) {
        return { ...prevState, selectedBox: selectedBox + 1 };
      }
      return prevState;
    }

    case Actions.PREV_BOX: {
      if (selectedBox % 5 > 0) {
        return { ...prevState, selectedBox: selectedBox - 1 };
      }
      return prevState;
    }

    case Actions.RESET: {
      return initialState;
    }

    default: {
      return prevState;
    }
  }
};

const Store: React.FC = ({ children }) => {
  const [{ selectedBox, grid }, dispatch] = useReducer(reducer, initialState);

  return (
    <GridContext.Provider value={{ selectedBox, grid, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};

export const GridContext = createContext<GridContextParams>(
  {} as GridContextParams,
);

export default Store;
