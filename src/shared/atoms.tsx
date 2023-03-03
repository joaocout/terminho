import { atom } from 'jotai';

import type { IBox, IGrid, BoxCorrectness } from './types';

// initializing each row with an arr of boxes
const initialGrid: IGrid = Array<IBox[]>(6)
  .fill([])
  .map((_, index) => {
    if (index === 0) {
      return Array<IBox>(5).fill({
        available: true,
        value: '',
        correctness: 'wrong',
      });
    }
    return Array<IBox>(5).fill({
      available: false,
      value: '',
      correctness: 'wrong',
    });
  });

const CORRECT_WORD = 'macro';

export const rowIAtom = atom(0); // selected row index
export const columnIAtom = atom(0); // selected column index
export const gridAtom = atom<IGrid>(initialGrid);

// setter atom, increments the selected row, setting the other atoms accordingly
export const nextRowAtom = atom(null, (get, set) => {
  const grid = get(gridAtom);
  const selectedRowIndex = get(rowIAtom);

  // if any box in the current row is still empty, dont go to next row
  if (grid[selectedRowIndex].some((item) => item.value === '')) return;

  // checking for correct, almost and wrong
  const typedWord = grid[selectedRowIndex].map((item) => item.value);
  const correctWord = [...CORRECT_WORD];
  const rowCorrectness: Array<BoxCorrectness> = Array(5).fill('wrong');
  // checking for correct
  typedWord.forEach((char, charIndex) => {
    if (char === correctWord[charIndex]) {
      rowCorrectness[charIndex] = 'correct';
      correctWord[charIndex] = '-';
    }
  });
  // checking for almost
  typedWord.forEach((char, charIndex) => {
    if (correctWord.includes(char)) {
      rowCorrectness[charIndex] = 'almost';
      correctWord[correctWord.indexOf(char)] = '-';
    }
  });

  const newGrid = grid.map((row, rowIndex) => {
    if (rowIndex === selectedRowIndex) {
      return row.map((box, boxIndex) => ({
        ...box,
        available: false,
        correctness: rowCorrectness[boxIndex],
      }));
    }
    if (rowIndex === selectedRowIndex + 1) {
      return row.map((box) => ({ ...box, available: true }));
    }
    return row;
  });

  // all letters are correct
  if (newGrid[selectedRowIndex].every((box) => box.correctness === 'correct')) {
    // won the game
  }

  set(gridAtom, newGrid);
  set(rowIAtom, Math.min(selectedRowIndex + 1, 5));
  set(columnIAtom, 0);
});

// setter atom, updates the value of a box
// calculates the next selected box
export const setBoxValueAtom = atom(null, (get, set, newValue: string) => {
  const grid = get(gridAtom);
  const columnI = get(columnIAtom);
  const rowI = get(rowIAtom);

  // selected column is out of bounds
  if (columnI >= 5) return;

  // selected box isn't available
  if (!grid[rowI][columnI].available) return;

  const newGrid = grid.map((row, rowIndex) => {
    if (rowIndex === rowI) {
      return row.map((box, boxIndex) => {
        if (boxIndex === columnI) {
          return { ...box, value: newValue };
        }
        return box;
      });
    }
    return row;
  });

  // searching for the next empty value box
  let newColumnI = (columnI + 1) % 5;
  while (newColumnI !== columnI && newGrid[rowI][newColumnI].value !== '') {
    newColumnI = (newColumnI + 1) % 5;
  }

  // if there are no empty boxes in the selected row
  // we should set the column index to an out of bounds value (5) which will disable the box selection
  if (newGrid[rowI].every((item) => item.value !== '')) newColumnI = 5;

  set(gridAtom, newGrid);
  set(columnIAtom, newColumnI);
});

export const deleteBoxValueAtom = atom(null, (get, set) => {
  const grid = get(gridAtom);
  const columnI = get(columnIAtom);
  const rowI = get(rowIAtom);

  // if the selected column is out of bounds, we treat its box as empty
  const selectedBoxValue = columnI >= 5 ? '' : grid[rowI][columnI].value;

  // if the selected column is empty, the next column will be selectedColumn - 1
  const newColumnI = Math.max(
    selectedBoxValue === '' ? columnI - 1 : columnI,
    0
  );

  const newGrid = grid.map((row, rowIndex) => {
    if (rowIndex === rowI) {
      return row.map((box, boxIndex) => {
        if (boxIndex === newColumnI) {
          return { ...box, value: '' };
        }
        return box;
      });
    }
    return row;
  });

  set(gridAtom, newGrid);
  set(columnIAtom, newColumnI);
});

export const almostLettersAtom = atom((get) => {
  const grid = get(gridAtom);
  const resultSet = new Set<string>();

  grid.forEach((row) =>
    row.forEach((box) => {
      if (box.correctness === 'almost') resultSet.add(box.value);
    })
  );

  return resultSet;
});

export const correctLettersAtom = atom((get) => {
  const grid = get(gridAtom);
  const resultSet = new Set<string>();

  grid.forEach((row) =>
    row.forEach((box) => {
      if (box.correctness === 'correct') resultSet.add(box.value);
    })
  );

  return resultSet;
});

export const wrongLettersAtom = atom((get) => {
  const grid = get(gridAtom);
  const resultSet = new Set<string>();

  grid.forEach((row) =>
    row.forEach((box) => {
      if (box.value.length && box.correctness === 'wrong' && !box.available)
        resultSet.add(box.value);
    })
  );

  return resultSet;
});
