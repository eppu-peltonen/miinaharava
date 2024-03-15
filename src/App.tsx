import { useState } from "react";
import Board from "./components/Board";
import Stats from "./components/Stats";
import { GameState } from "./enum/gameState";

const App = () => {

    const [gameState, setGameState] = useState(GameState.READY);
    const [time, setTime] = useState("");

    return (
        <main className="bg-minefield bg-center bg-cover">
            <div className="container mx-auto h-screen flex flex-row">
                <Board
                    gameState={gameState}
                    setGameState={setGameState}
                />
                {gameState === GameState.WIN &&
                    <Stats time={time} />
                }
            </div>
        </main>
    );
}

export default App;