import { useEffect } from 'react';

type StopwatchProps = {
    isRunning: boolean;
    gameReady: boolean;
    time: number;
    setTime: (time: number) => void;
};

const Stopwatch = ({isRunning, gameReady, time, setTime}: StopwatchProps) => {
    
    useEffect(() => {
        let intervalId: number;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1), 10)
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time, setTime])

    useEffect(() => {
        if (gameReady) {
            setTime(0);
        }
    }, [gameReady, setTime]);

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    return (
        <button disabled className="w-20 bg-slate-500 rounded-lg shadow-lg">
            <p className="text-white text-lg font-bold">
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </p>
        </button>
    );
};

export default Stopwatch;