import flagWhite from '../assets/flagWhite.svg';
import Stopwatch from './Stopwatch';

type StatusProps = {
    flags: number;
    gameState: number;
    startNewGame: () => void;
    time: number;
    setTime: (time: number) => void;
};

const Status = ({flags, gameState, startNewGame, time, setTime}: StatusProps) => {
    return (
        <div className="flex flex-row place-content-between mb-6">
            <div className="flex flex-row w-20 bg-slate-500 rounded-lg shadow-lg justify-center">
                <img className="h-8 w-8" src={flagWhite} alt="flag" />
                <span className="ml-2 text-xl text-white font-bold">{flags}</span>
            </div>
            <button
                className="bg-slate-500 w-20 rounded-lg shadow-lg"
                onClick={startNewGame}
            >
                <span className="text-white font-bold">Uusi peli</span>
            </button>
            <Stopwatch
                isRunning={gameState === 1}
                gameReady={gameState === 0}
                time={time}
                setTime={setTime}
            />
        </div>
    )
};

export default Status;