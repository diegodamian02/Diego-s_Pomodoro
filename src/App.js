import React, {useEffect, useState} from 'react';
import { v4 as uuidv4} from "uuid";
import Timer from './Timer';
import './App.css';
import Report from "./Report";

function App() {
    const [view, setView] = useState('Timer'); // "Timer" or "Report"
    const [timeLeft, setTimeLeft] = useState(25*60);
    const [isRunning, setIsRunning] = useState(false)
    const [mode, setMode] = useState("Work");
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        let storedUserId = localStorage.getItem("userID");
        if (!storedUserId) {
            storedUserId = uuidv4();
            localStorage.setItem("userID", storedUserId);
        }
        setUserID(storedUserId);
        console.log("User ID:", storedUserId);
    }, []);

    return (
        <div className="App">
            <header className="header">
                <h1>Diego's Pomodoro</h1>
                <div className="nav-buttons">
                    <button onClick={() => setView('Timer')}>Timer</button>
                    <button onClick={() => setView('Report')}>Activity Log</button>
                </div>
            </header>
            <main className="content">
                {view === "Timer" ? (
                    <Timer
                        timeLeft={timeLeft}
                        setTimeLeft={setTimeLeft}
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                        mode={mode}
                        setMode={setMode}
                        userID={userID}
                    />
                ) : (
                    <Report userID={userID}/>
                )}
            </main>
            <footer className="footer">
                <p>

                    The alarm sound is melody titled <em>Sonata di Fantaisie</em>, a piece I composed for my <em>Scoring Film Media</em> class. I hope you enjoy
                    it!
                </p>
            </footer>

        </div>
    );
}

export default App;