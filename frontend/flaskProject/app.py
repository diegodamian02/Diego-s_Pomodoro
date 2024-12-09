from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})

#Log file path

LOG_FILE = "timer_log.txt"
file_cleared = False


# Route for logging timer data
@app.route('/log', methods=['POST'])
def log():
    global file_cleared

    #Clear the log file on the first request
    if not file_cleared:
        open(LOG_FILE, "w").close()
        file_cleared = True

    data = request.json
    event = data.get("event")
    mode = data.get('mode', 'N/A')
    duration = data.get('duration', 0)  # duration in seconds

    # Now lets convert the duration to min for better readability
    minutes = duration // 60
    seconds = duration % 60

    # timestamp for when the log is recorded
    timestamp = datetime.now().strftime("%m/%d/%Y %H:%M:%S")

    # Format log entry
    log_entry = f"Timestamp: {timestamp}, Event: {event}, Mode: {mode}, Duration: {minutes}m {seconds}s\n"

    # Append log entry to file
    with open(LOG_FILE, 'a') as f:
        f.write(log_entry)

    return jsonify({"message": "Log recorded successfully"}), 200


@app.route('/logs', methods=['GET'])
def get_logs():
    print("Received GET request at /logs")
    logs = []
    try:
        with open(LOG_FILE, 'r') as f:
            for line in f:
                if line.strip():
                    logs.append(line.strip())
    except FileNotFoundError:
        return jsonify({"logs": []}), 200  # Respond with an empty log list

    print(f"Returning logs: {logs}")
    return jsonify({"logs": logs}), 200


# We are going to get the logs whenever the user stops, resets or finished the timer

@app.route('/timer', methods=['GET', 'POST'])
def timer():
    return jsonify({"message": "Pomodoro timer backend active"}), 200


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)
