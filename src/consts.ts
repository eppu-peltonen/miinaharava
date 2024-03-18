import { Settings } from './types';
import { GameLevel } from './enum';

export const settings: Settings[] = [
    {level: GameLevel.BEGINNER, rows: 9, cols: 9, mines: 10},
    {level: GameLevel.INTERMEDIATE, rows: 16, cols: 16, mines: 40},
    {level: GameLevel.EXPERT, rows: 16, cols: 30, mines: 99},
];

export const helpText: string = 'Click on a cell to reveal it. Right click on a cell to flag it.';