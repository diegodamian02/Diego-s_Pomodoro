import React, {useState} from 'react';
import Timer from './Timer';
import './App.css';
import Report from "./Report";

function App() {
    const [view, setView] = useState('Timer'); // "Timer" or "Report"
    const [timeLeft, setTimeLeft] = useState(25*60);
    const [isRunning, setIsRunning] = useState(false)
    const [mode, setMode] = useState("Work");

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
                    />
                ) : (
                    <Report/>
                )}
            </main>
            <footer className="footer">
                <p>
                    Alarm sound is a musical piece I composed for my class <em>Scoring Film Media</em>. I hope you liked
                    it!
                </p>
            </footer>

        </div>
    );
}

export default App;