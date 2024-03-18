import { GameLevel } from "./enum";

export type Cell = {
    isMine: boolean;
    isFlagged: boolean;
    isRevealed: boolean;
    x: number;
    y: number;
    neighboringMines: number;
}

export type Settings = {
    level: GameLevel;
    rows: number;
    cols: number;
    mines: number;
};
