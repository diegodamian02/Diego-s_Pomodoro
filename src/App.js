import React, {useState} from 'react';
import Timer from './Timer'; // Import the Timer component
import './App.css';
import Report from "./Report"; // Import CSS for styling

function App() {
    const [view, setView] = useState('Timer'); // "Timer" or "Report"

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
            {view === 'Timer' ? <Timer />  : <Report />}
            </main>

        </div>
    );
}

export default App;