import flagWhite from '../assets/flagWhite.svg';
import Stopwatch from './Stopwatch';
import { GameLevel } from '../enum';
import { settings } from '../consts';
import Tooltip from './Tooltip';
import { helpText } from '../consts';

type StatusProps = {
    flags: number;
    gameState: number;
    startNewGame: (level: GameLevel) => void;
    time: number;
    setTime: (time: number) => void;
    gameLevel: GameLevel;
};

const Status = ({flags, gameState, startNewGame, time, setTime}: StatusProps) => {

    const changeLevel = (level: GameLevel) => {
        startNewGame(level);
    }

    return (
        <div className="flex flex-row mx-auto mb-6">
            <div className="flex flex-row w-20 bg-slate-500 rounded-lg shadow-lg justify-center">
                <img className="h-8 w-8" src={flagWhite} alt="flag" />
                <span className="ml-2 text-xl text-white font-bold">{flags}</span>
            </div>
            {settings.map((setting, index) => {
                return (
                    <button
                        key={index}
                        className={"bg-slate-500 px-2 mx-4 rounded-lg shadow-lg"}
                        onClick={() => changeLevel(setting.level)}
                    >
                        <span className="text-white font-bold">{setting.level}</span>
                    </button>
                )
            })}
            <Stopwatch
                isRunning={gameState === 1}
                gameReady={gameState === 0}
                time={time}
                setTime={setTime}
            />
            <Tooltip text={helpText} />
        </div>
    )
};

export default Status;