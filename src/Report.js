import React, { useState, useEffect} from "react";
import axios from "axios";
import './Report.css';

function Report(){
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);

    // Fetch logs from the backend
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/logs')
            .then((response) => {
                console.log("Fetched logs:", response.data.logs);
                setLogs(response.data.logs || []);
            })
            .catch(error => setError("Failed to load logs"));
    }, []);

    return (
        <div className="table-container">
            <h2>Activity Log</h2>
            {error && <p style={{color : 'red'}}>{error}</p>}

            {logs.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Event</th>
                        <th>Mode</th>
                        <th>Durations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map((log, index) => {
                        if (!log || typeof  log !== 'string'){
                            //Skip invalid log entries
                            console.warn(`Invalid log entry at index ${index}:`, log);
                            return null;
                        }
                        // Parse the log entry
                        const logParts = log.split(', ');
                        if (logParts.length < 4){
                            console.warn(`Malformed log entry at index ${index}:`, log);
                            return null;
                        }

                        const timestamp = logParts[0].split(': ')[1] || 'N/A';
                        const event = logParts[1].split(': ')[1] || 'N/A';
                        const mode = logParts[2].split(': ')[1] || 'N/A';
                        const duration = logParts[3].split(': ')[1] || 'N/A';
                        // Parse duration into minutes & seconds
                        const [minutes, seconds] = duration.split('m').map((time) =>
                        parseInt(time.replace('s', '')) || 0);

                        const totalDurationInSeconds = minutes * 60 + seconds;

                        //Determine the target duration for each mode
                        let targetDuration = 0
                        if (mode === 'Work') targetDuration = 25 * 60;
                        else if (mode === "Short Break") targetDuration = 5 * 60;
                        else if (mode === "Long Break") targetDuration = 15 * 60;

                        // Calculate the elapsed time

                        const elapsedTimeSeconds = Math.abs(targetDuration- totalDurationInSeconds)


                        //Format elapsed time
                        const elapsedMinutes = Math.floor(elapsedTimeSeconds / 60);
                        const elapsedSeconds = elapsedTimeSeconds % 60
                        return (
                            <tr key = {index}>
                                <td>{timestamp}</td>
                                <td>{event }</td>
                                <td>{mode}</td>
                                <td>{elapsedMinutes}m {elapsedSeconds}s</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            ) : (
                <p>No activity logged yet</p>
            )}
        </div>
    );

}

export default Report;