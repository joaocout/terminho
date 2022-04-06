import React, { createContext, useState } from 'react';

import type { GridBox } from '../shared/types';

export type GridContextParams = {
  selectedBox: number;
  grid: GridBox[][];
  setSelectedBox: React.Dispatch<React.SetStateAction<number>>;
  updateBoxValue: (boxIndex: number, newValue: string) => void;
  nextRow: (rowIndex: number) => void;
  reset: () => void;
};

const initialState: Array<Array<GridBox>> = Array(6)
  .fill(Array(5).fill({ available: false, value: '' }))
  .map((item, index) => {
    if (index === 0) {
      // initializing first row with active boxes
      const arr: Array<GridBox> = Array(5).fill({ available: true, value: '' });
      return arr;
    }
    return item;
  });

const Store: React.FC = ({ children }) => {
  const [selectedBox, setSelectedBox] = useState(0);
  const [grid, setGrid] = useState(initialState);

  const nextRow = (rowIndex: number) => {
    const newGrid = grid.map((row, oldRowIndex) => {
      if (rowIndex === oldRowIndex) {
        return row.map(box => ({ ...box, available: false }));
      }
      if (rowIndex + 1 === oldRowIndex) {
        return row.map(box => ({ ...box, available: true }));
      }

      return row;
    });
    setGrid(newGrid);
  };

  const updateBoxValue = (boxIndex: number, newValue: string) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((oldBox, columnIndex) => {
        if (rowIndex * 5 + columnIndex === boxIndex) {
          return { ...oldBox, value: newValue };
        }
        return oldBox;
      }),
    );
    setGrid(newGrid);
  };

  const reset = () => {
    setGrid(initialState);
    setSelectedBox(0);
  };

  return (
    <GridContext.Provider
      value={{
        grid,
        selectedBox,
        updateBoxValue,
        setSelectedBox,
        nextRow,
        reset,
      }}>
      {children}
    </GridContext.Provider>
  );
};

export const GridContext = createContext<GridContextParams>(
  {} as GridContextParams,
);

export default Store;
