// grid box state
export type GridBox = {
  available: boolean;
  value: string;
};

// props sent to box component
export type BoxProps = {
  index: number;
  selectedIndex: number;
  box: GridBox;
  onSelectedBoxChange: (selectedBox: number) => void;
};

export type GridContextParams = {
  selectedBox: number;
  grid: GridBox[][];
  setSelectedBox: React.Dispatch<React.SetStateAction<number>>;
  updateBoxValue: (boxIndex: number, newValue: string) => void;
  nextRow: (rowIndex: number) => void;
  reset: () => void;
};
