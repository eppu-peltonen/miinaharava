import { useState } from "react";
import Board from "./components/Board";
import Stats from "./components/Stats";
import Status from "./components/Status";
import { GameState, GameLevel } from "./enum";

const App = () => {

    const [gameState, setGameState] = useState(GameState.READY);
    const [time, setTime] = useState(0);
    const [gameLevel, setGameLevel] = useState(GameLevel.BEGINNER);
    const [flags, setFlags] = useState(10);

    const startNewGame = (level: GameLevel) => {
        setGameState(GameState.READY);
        setGameLevel(level);
    }

    return (
        <main className="h-screen bg-minefield bg-center bg-cover">
            <div className="flex flex-col h-screen">
                <div className="mx-auto mt-10 flex flex-col p-6 bg-slate-700 rounded-xl">
                <Status
                        flags={flags}
                        gameState={gameState}
                        startNewGame={startNewGame}
                        time={time}
                        setTime={setTime}
                        gameLevel={gameLevel}
                    />
                </div>
                <div className="mx-auto mt-10 bg-slate-700 rounded-xl flex flex-col p-6">  
                    <Board
                        gameState={gameState}
                        setGameState={setGameState}
                        gameLevel={gameLevel}
                        flags={flags}
                        setFlags={setFlags}
                    />
                {gameState === GameState.WIN &&
                    <Stats time={time} />
                }
                </div>     
            </div>
        </main>
    );
}

export default App;