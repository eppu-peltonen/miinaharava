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
        <main className="bg-minefield bg-center bg-cover">
            <div className="h-screen flex">
                <div className="m-auto bg-slate-700 rounded-xl flex flex-col p-6"> 
                    <Status
                        flags={flags}
                        gameState={gameState}
                        startNewGame={startNewGame}
                        time={time}
                        setTime={setTime}
                        gameLevel={gameLevel}
                    />
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