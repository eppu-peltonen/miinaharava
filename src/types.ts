export type Cell = {
    isMine: boolean;
    isFlagged: boolean;
    isRevealed: boolean;
    x: number;
    y: number;
    neighboringMines: number;
}
