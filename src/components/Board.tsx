import flagWhite from '../assets/flagWhite.svg';
import flagBlack from '../assets/flagBlack.svg';
import mine from '../assets/mine.svg';
import React, { useState } from 'react';
import Stopwatch from './Stopwatch';
import { GameState } from '../enum/gameState';

type Cell = {
    isMine: boolean;
    isFlagged: boolean;
    isRevealed: boolean;
    x: number;
    y: number;
    neighboringMines: number;
}

type BoardProps = {
    gameState: number;
    setGameState: (state: number) => void;
}

const Board = ({
        gameState,
        setGameState
    }: BoardProps) => {

        const ROWS = 9;
        const COLS = 9;
        const MINES = 10;

    const [cells, setCells] = useState<Cell[][]>([]);
    const [flags, setFlags] = useState(10);
    const [cellsLeft, setCellsLeft] = useState(ROWS * COLS);

    const startNewGame = () => {
        setGameState(GameState.READY);
        setFlags(MINES);

        const board = setupBoard();
        setCells(board);
    }

    const setupBoard = (): Cell[][] => {

        const newCells: Cell[][] = [];
        for (let y = 0; y < ROWS; y++) {
            const row: Cell[] = [];
            for (let x = 0; x < COLS; x++) {
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

        return mineBoardWithNeighbors;
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
    };

    const fillMines = (board: Cell[][]): Cell[][] => {

        let mines = MINES;
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

        if (gameState === 0) {
            setGameState(GameState.RUNNING);
        }
        
        cell.isRevealed = true;
        setCellsLeft(prev => prev - 1);


        if (cell.isMine){
            setGameState(GameState.LOSE);
            setCells(revealMines(cells));
            return;
        }

        setCells([...cells]);
    }

    const handleCellRightClick = (cell: Cell, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
        event.preventDefault();

        if (cell.isRevealed) {
            return;
        
        }

        cell.isFlagged = !cell.isFlagged;
        setFlags(cell.isFlagged ? flags - 1 : flags + 1);

        setCells([...cells]);
    }

    return (
        <div className="m-auto bg-slate-700 rounded-xl flex flex-col p-6">
            <div className="flex flex-row place-content-between mb-6">
                <div className="flex flex-row w-20 bg-slate-500 rounded-lg shadow-lg justify-center">
                    <img className="h-8 w-8" src={flagWhite} alt="flag" />
                    <span className="text-xl text-white font-bold">{flags}</span>
                </div>
                <button
                    className="bg-slate-500 w-20 rounded-lg shadow-lg"
                    onClick={startNewGame}
                >
                    <span className="text-white font-bold">Uusi peli</span>
                </button>
                <Stopwatch isRunning={gameState === 1} gameReady={gameState === 0} />
            </div>
            
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
                                    cell.neighboringMines
                                }
                                {cell.isFlagged &&
                                    <img src={flagBlack} className="w-7 h-7" alt="flag" />
                                }
                            </button>
                        );
                    });
                })}
            </div>
        </div>
    );
}



export default Board;