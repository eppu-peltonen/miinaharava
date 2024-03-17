import React, {useEffect, useState} from 'react';
import flagBlack from '../assets/flagBlack.svg';
import mine from '../assets/mine.svg';
import { GameState, GameLevel } from '../enum';
import { Cell } from '../types';

type BoardProps = {
    gameState: GameState;
    setGameState: (state: number) => void;
    gameLevel: GameLevel;
    flags: number;
    setFlags: (flags: number) => void;
}

const Board = ({
        gameState,
        setGameState,
        gameLevel,
        flags,
        setFlags,
    }: BoardProps) => {

        const [cells, setCells] = useState<Cell[][]>([]);
        const [rows, setRows] = useState(9);
        const [cols, setCols] = useState(9);
        const [cellsLeft, setCellsLeft] = useState(rows * cols);
        const [mineAmount, setMineAmount] = useState(10);

        const setupBoard = () => {

            const newCells: Cell[][] = [];
            for (let y = 0; y < rows; y++) {
                const row: Cell[] = [];
                for (let x = 0; x < cols; x++) {
                    row.push({
                        isMine: false,
                        isFlagged: false,
                        isRevealed: false,
                        x: x,
                        y: y,
                        neighboringMines: 0
                    });
                }
                newCells.push(row);
            }
    
            const mineBoard = fillMines(newCells);
            const mineBoardWithNeighbors = calculateNeighboringMines(mineBoard);
    
            setCells(mineBoardWithNeighbors);
        }

        useEffect(() => {
            if (gameState === GameState.READY) {
                setupBoard()
                setCellsLeft(() => rows * cols);
                setFlags(mineAmount);
                setCellsLeft(() => rows * cols);
            }
        }, [gameState, rows, cols, setCells, setFlags, setCellsLeft, mineAmount]);

        useEffect(() => {
            if (gameLevel === GameLevel.BEGINNER) {
                setRows(9);
                setCols(9);
                setMineAmount(10);
            } else if (gameLevel === GameLevel.INTERMEDIATE) {
                setRows(16);
                setCols(16);
                setMineAmount(40);
            } else {
                setRows(16);
                setCols(30);
                setMineAmount(99);
            }
        }, [gameLevel]);

        const fillMines = (board: Cell[][]): Cell[][] => {

            let mines = mineAmount;
            const mineBoard = board;
    
            while (mines > 0) {
                const x = Math.floor(Math.random() * 9);
                const y = Math.floor(Math.random() * 9);
    
                if (!mineBoard[x][y].isMine){
                    mineBoard[x][y].isMine = true;
                    mines--;
                }
            }
    
            return mineBoard;
        }

        const calculateNeighboringMines = (board: Cell[][]): Cell[][] => {

            const newBoard = board;
            const rows = newBoard.length;
            const cols = newBoard[0].length;
    
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
    
                    let neighboringMines = 0;
    
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const neighborX = x + i;
                            const neighborY = y + j;
    
                            if ((neighborX < 0
                                || neighborX >= cols
                                || neighborY < 0
                                || neighborY >= rows)
                                || (i === 0 && j === 0)
                                ) {
                                continue;
                            }
    
                            if (newBoard[neighborY][neighborX].isMine) {
                                neighboringMines++;
                            }
                        }
                    }
                    newBoard[y][x].neighboringMines = neighboringMines;
                }
            }
            return newBoard;
        }

    const revealMines = (board: Cell[][]): Cell[][] => {

        const newBoard = board;

        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (newBoard[y][x].isMine) {
                    newBoard[y][x].isRevealed = true;
                }
            }
        }
        return newBoard;
    }

    const handleCellClick = (cell: Cell) => {

        if (cell.isFlagged){
            return;
        }

        if (gameState === GameState.READY) {
            setGameState(GameState.RUNNING);
        }

        cell.isRevealed = true;
        setCellsLeft(prev => prev - 1);

        const currentOpenCells = cellsLeft - 1;

        if (currentOpenCells === mineAmount) {
            setGameState(GameState.WIN);
        }

        if (cell.isMine){
            setGameState(GameState.LOSE);
            setCells(revealMines(cells));
            return;
        }

        expandEmptyCells(cell);

        setCells([...cells]);
    }

    const handleCellRightClick = (cell: Cell, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
        event.preventDefault();

        if (gameState === GameState.READY){
            setGameState(GameState.RUNNING);
        }

        if (cell.isRevealed) {
            return;
        }

        cell.isFlagged = !cell.isFlagged;
        setFlags(cell.isFlagged ? flags - 1 : flags + 1);

        setCells([...cells]);
    }

    const expandEmptyCells = (cell: Cell) => {
            
        if (cell.neighboringMines === 0) {
            const queue = [cell];
            while (queue.length > 0) {
                const currentCell = queue.pop();
                if (!currentCell) {
                    continue;
                }
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const neighborX = currentCell.x + i;
                        const neighborY = currentCell.y + j;

                        if ((neighborX < 0
                            || neighborX >= cols
                            || neighborY < 0
                            || neighborY >= rows)
                            || (i === 0 && j === 0)
                            ) {
                            continue;
                        }

                        const neighbor = cells[neighborY][neighborX];
                        if (!neighbor.isRevealed) {
                            neighbor.isRevealed = true;
                            setCellsLeft(prev => prev - 1);
                            if (neighbor.neighboringMines === 0) {
                                queue.push(neighbor);
                            }
                        }
                    }
                }
            }
        }
    }

    return (    
        <div className="grid grid-cols-9 grid-rows-9">
            {cells.map((row) => {
                return row.map((cell, x) => {
                    return (
                        <button
                            key={x}
                            className={`${cell.isRevealed ? "bg-slate-400" : "bg-slate-500" }  border border-white w-10 h-10`}
                            onClick={()=> handleCellClick(cell)}
                            onContextMenu={(event) => handleCellRightClick(cell, event)}
                            disabled={cell.isRevealed || gameState === 2 || gameState === 3}
                        >
                            {cell.isRevealed && cell.isMine &&
                                <img src={mine} alt="mine" />
                            }
                            {cell.isRevealed && !cell.isMine &&
                                <span className={
                                    `font-bold text-2xl
                                    ${cell.neighboringMines === 1 ? "text-sky-600"
                                    : cell.neighboringMines === 2 ? "text-emerald-600"
                                    : cell.neighboringMines === 3 ? "text-rose-600"
                                    : cell.neighboringMines === 4 ? "text-sky-900"
                                    : cell.neighboringMines === 5 ? "text-rose-900"
                                    : cell.neighboringMines === 6 ? "text-teal-400"
                                    : cell.neighboringMines === 7 ? "text-violet-900"
                                    : "text-slate-900"}`
                                }>
                                    {cell.neighboringMines === 0 ? "" : cell.neighboringMines}
                                </span>
                            }
                            {cell.isFlagged &&
                                <img src={flagBlack} className="w-7 h-7 ml-1" alt="flag" />
                            }
                        </button>
                    );
                });
            })}
        </div>
    );
}

export default Board;