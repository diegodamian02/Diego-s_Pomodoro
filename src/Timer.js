import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import './Timer.css'


function Timer() {

    const WORK_TIME = 25 * 60; // 25 minutes
    const SHORT_BREAK = 5 * 60; // 5 minutes
    const LONG_BREAK = 15 * 60 // 15 minutes
    const [timeLeft, setTimeLeft] = useState(WORK_TIME); //25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Work'); // Modes: 'Work', 'Short Break', 'Long Break'
    const getTimeForMode = useCallback(
        (modeType = mode) => {
            switch (modeType) {
                case "Work":
                    return WORK_TIME;
                case "Short Break":
                    return SHORT_BREAK;
                case "Long Break":
                    return LONG_BREAK;
                default:
                    return WORK_TIME;
            }
        },
        [mode] // Include 'mode' as a dependency
    );


    useEffect(() => {
    let timerInterval = null;

    if(isRunning && timeLeft > 0){
        // Start interval that counts down every second
        timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime -1);
            }, 1000);
    } else if (timeLeft === 0){
        // Stop the tier if the time has run out

        clearInterval(timerInterval);
        setIsRunning(false);
        logEvent("Times Up", mode, getTimeForMode(mode))
        alert("Time's up!");
    }

    // Clean up interval on component amount unmount or when stopped timer
        return () => clearInterval(timerInterval);
    }, [isRunning, timeLeft, mode, getTimeForMode]);

    // Log event to backed
    const logEvent = (event, mode, duration) => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/log`, {
                event,
                mode,
                duration
            })
            .then((response) => console.log(response.data.message))
            .catch((error) => console.error("Error logging event:", error));
    };

    //Start the timer

    const startTimer = () => {
    setIsRunning(true); //Start timer
    };

    const stopTimer = () => {
        setIsRunning(false); // Stop timer
        logEvent("Timer Stopped", mode, timeLeft);
    };

    const resetTimer = () => {
        setIsRunning(false); //Stop Timer
        logEvent("Timer Reset", mode, getTimeForMode(mode));
        setTimeLeft(getTimeForMode(mode)) //Reset to the selected time
    };

    // Set the time based on the selected mode
    const switchMode = (newMode) => {
        setMode(newMode);
        setIsRunning(false); // Stop timer when switching
        setTimeLeft(getTimeForMode(newMode)); // Set new Time mode
    };

    // Convert timeLeft to minutes and seconds for display

    const minutes = Math.floor(timeLeft /60);
    const seconds = timeLeft % 60;

return (
    <div className='container'>
        <h1>Pomodoro Timer</h1>

        {/* Tabs for selecting Work, Short Break, Long Break */}
        <div className='tabs'>
            <button onClick={() => switchMode('Work')} disabled={(mode === 'Work')}>
                Work
            </button>
            <button onClick={() => switchMode('Short Break')} disabled={(mode === 'Short Break')}>
                Short Break
            </button>
            <button onClick={() => switchMode('Long Break')} disabled={(mode === 'Long Break')}>
                Long Break
            </button>
        </div>

        {/* Timer Display */}
        <div className='timer-display'>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2,"0")}
        </div>
        <div className='button-group'>
            <button onClick={startTimer} disabled={isRunning}>Start</button>
            <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    </div>
    );
}

export default Timer;