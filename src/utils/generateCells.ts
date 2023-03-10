import { MAX_COLS, MAX_ROWS, COUNT_OF_BOMBS } from "../constants/constants";
import { Cell, CellState, CellValue } from "../types/types";
import { grabAllAdjacentCells } from './grabAllAdjacentCells';

export const generateCells = (): Cell[][] => {
    let cells: Cell[][] = [];
  
    for (let row = 0; row < MAX_ROWS; row++) {
      cells.push([]);
      for (let col = 0; col < MAX_COLS; col++) {
        cells[row].push({
          value: CellValue.none,
          state: CellState.open
        });
      }
    }
  
    let bombsPlaced = 0;
    while (bombsPlaced < COUNT_OF_BOMBS) {
      const randomRow = Math.floor(Math.random() * MAX_ROWS);
      const randomCol = Math.floor(Math.random() * MAX_COLS);
  
      const currentCell = cells[randomRow][randomCol];
      if (currentCell.value !== CellValue.bomb) {
        cells = cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (randomRow === rowIndex && randomCol === colIndex) {
              return {
                ...cell,
                value: CellValue.bomb
              };
            }
  
            return cell;
          })
        );
        bombsPlaced++;
      }
    }
  
    for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
      for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
        const currentCell = cells[rowIndex][colIndex];
        if (currentCell.value === CellValue.bomb) {
          continue;
        }
  
        let numberOfBombs = 0;
        const {
          topLeftCell,
          topCell,
          topRightCell,
          leftCell,
          rightCell,
          bottomLeftCell,
          bottomCell,
          bottomRightCell
        } = grabAllAdjacentCells(cells, rowIndex, colIndex);
  
        if (topLeftCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (topCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (topRightCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (leftCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (rightCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (bottomLeftCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (bottomCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
        if (bottomRightCell?.value === CellValue.bomb) {
          numberOfBombs++;
        }
  
        if (numberOfBombs > 0) {
          cells[rowIndex][colIndex] = {
            ...currentCell,
            value: numberOfBombs
          };
        }
      }
    }
  
    return cells;
  };