import React, { createContext, useState } from 'react';

import type { GridBox } from '../shared/types';

export type GridContextParams = {
  selectedBox: number;
  grid: GridBox[][];
  setSelectedBox: React.Dispatch<React.SetStateAction<number>>;
  updateBoxValue: (newValue: string) => void;
  nextRow: () => void;
  nextBox: () => void;
  prevBox: () => void;
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

  const selectedRowIndex = Math.min(Math.floor(selectedBox / 5), 4);
  const typedWord = grid[selectedRowIndex].map((item) => item.value).join('');

  const nextRow = () => {
    if (typedWord.length === 5) {
      const newGrid = grid.map((row, index) => {
        if (index === selectedRowIndex) {
          return row.map((box) => ({ ...box, available: false }));
        }
        if (index === selectedRowIndex + 1) {
          return row.map((box) => ({ ...box, available: true }));
        }
        return row;
      });
      setGrid(newGrid);
      // when we go to the next row, we must also switch the selectedBox to the begin of the new row
      setSelectedBox((selectedRowIndex + 1) * 5);
    }
  };

  const nextBox = () => {
    // if the selectedbox is not the last from its row
    if (selectedBox % 5 < 4) {
      setSelectedBox((prev) => prev + 1);
    }
  };

  const prevBox = () => {
    // if the selectedbox is not the first from its row
    if (selectedBox % 5 > 0) {
      setSelectedBox((prev) => prev - 1);
    }
  };

  const updateBoxValue = (newValue: string) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((oldBox, columnIndex) => {
        if (rowIndex * 5 + columnIndex === selectedBox) {
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
        nextBox,
        prevBox,
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
