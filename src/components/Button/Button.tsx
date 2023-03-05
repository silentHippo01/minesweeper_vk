import React, { FC } from 'react';
import './Button.scss';
import { CellState, CellValue } from '../../types/types';

interface buttonProps{
    row: number;
    col: number;
    state: CellState;
    value: CellValue;
    className?: string;
    onClick(rowParam: number, colParam: number): (...args: any[]) => void,
    onContext(rowParam: number, colParam: number): (...args: any[]) => void,
    red?:boolean,
}

const Button: FC<buttonProps> = ({row, col, state, onClick, onContext, value, red}) => {
    return (
        <div 
            className={ `button ${state === CellState.visible ? "visible" : ''} ${state === CellState.flagged ? "flagged" : ""} value-${value} ${red ? 'red' : ''}`
            }
            onClick={onClick(row,col)}
            onContextMenu={onContext(row, col)}
        >
        </div>
    );
};

export default Button;