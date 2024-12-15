import React, {useCallback, useEffect, useState, useMemo} from "react";
import axios from "axios";
import './Timer.css'


function Timer() {

    const WORK_TIME = 25 * 60; // 25 minutes
    const SHORT_BREAK = 5 * 60; // 5 minutes
    const LONG_BREAK = 15 * 60 // 15 minutes
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem("timeLeft");
        return savedTime !== null ? parseInt(savedTime, 10) : WORK_TIME;
    }); //25 minutes
    const [isRunning, setIsRunning] = useState(() => {
        return JSON.parse(localStorage.getItem("isRunning")) || false;
    });
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("mode") || "Work";
    }); // Modes: 'Work', 'Short Break', 'Long Break'

    const [startTime, setStartTime] = useState(() => {
        return parseInt(localStorage.getItem("startTime"), 10) || Date.now();
    })

    const buttonSound =  new Audio('/Sound/button.mp3');
    const timerCompleted = useMemo(() => new Audio('/Sound/alarm.mp3'), []);

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
        [WORK_TIME, SHORT_BREAK, LONG_BREAK, mode] // Include 'mode' as a dependency
    );

    //Counter for the timer.
    useEffect(() => {
    let timerInterval = null;

    if(isRunning) {
        // Start interval that counts down every second
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = Math.max(getTimeForMode(mode) - elapsed, 0);
            setTimeLeft(remainingTime);
            if (remainingTime === 0) {
                // Stop the tier if the time has run out
                clearInterval(timerInterval);
                setIsRunning(false);
                timerCompleted.play();
                logEvent("Times Up", mode, getTimeForMode(mode))
                setTimeLeft(getTimeForMode(mode))
                setTimeout( () => {
                    alert("Time's up!");
                }, 0);
            }
        }, 1000);
    }

    // Clean up interval on component amount unmount or when stopped timer
        return () => clearInterval(timerInterval);
    }, [isRunning, timeLeft, mode, getTimeForMode, timerCompleted, startTime]);

    useEffect(() => {
        // Save the current state to localStorage
        localStorage.setItem("timeLeft", timeLeft);
        localStorage.setItem("isRunning", isRunning);
        localStorage.setItem("mode", mode);
        localStorage.setItem("startTime", startTime);
    }, [timeLeft, isRunning, mode, startTime]);

    // Delete logs ONLY when website is refreshed.
    useEffect(() => {
        const resetTimerOnReload = () => {
            // Reset timer state
            setTimeLeft(WORK_TIME);
            setIsRunning(false);
            setMode("Work");
            localStorage.clear();

            setTimeout(() => {
                console.log("Logs cleared locally.")
            }, 0);
            
            // Clear activity logs on the backend
            axios
                .delete(`${process.env.REACT_APP_API_BASE_URL}/logs`)
                .then(() => console.log("Activity log cleared on reload."))
                .catch((error) => console.error("Error clearing logs:", error));
        };

        window.addEventListener("beforeunload", resetTimerOnReload);

        return () => {
            window.removeEventListener("beforeunload", resetTimerOnReload);
        };
    }, [WORK_TIME]);

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
        setStartTime(Date.now() - (getTimeForMode(mode) - timeLeft) * 1000);
        buttonSound.play();
    };

    const stopTimer = () => {
        setIsRunning(false); // Stop timer
        buttonSound.play();
        logEvent("Timer Stopped", mode, timeLeft);
    };

    const resetTimer = () => {
        setIsRunning(false); //Stop Timer
        setTimeLeft(getTimeForMode(mode)) //Reset to the selected time
        buttonSound.play();
        timerCompleted.pause()
        logEvent("Timer Reset", mode, getTimeForMode(mode));
    };

    // Set the time based on the selected mode
    const switchMode = (newMode) => {
        setMode(newMode);
        setIsRunning(false); // Stop timer when switching
        setTimeLeft(getTimeForMode(newMode)); // Set new Time mode
        localStorage.setItem("mode", mode)
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