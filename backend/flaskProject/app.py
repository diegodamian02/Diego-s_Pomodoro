from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import pytz
import os

#US East Coast hour
LOCAL_TIMEZONE = pytz.timezone('US/Eastern')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000","https://diegospomodoro.com", "https://diegospomodoro.netlify.app"]}})

#Memmory log storage
LOGS = {}

LOGS_DIR = 'logs'
if not os.path.exists(LOGS_DIR):
    os.makedirs(LOGS_DIR)



# Route for logging timer data
@app.route('/log', methods=['POST'])
def log():
    data = request.json
    user_id = data.get('userID')
    event = data.get("event")
    mode = data.get('mode', 'N/A')
    duration = data.get('duration', 0)  # duration in seconds

    if not user_id:
        return jsonify({"error": "userID is missing"}), 400

    # Now lets convert the duration to min for better readability
    minutes = duration // 60
    seconds = duration % 60

    # timestamp for when the log is recorded
    timestamp = datetime.now(LOCAL_TIMEZONE).strftime("%m/%d/%Y %H:%M:%S")

    # Format log entry
    log_entry = f"Timestamp: {timestamp}, Event: {event}, Mode: {mode}, Duration: {minutes}m {seconds}s\n"

    #File path for the user's logs
    user_log_file = os.path.join(LOGS_DIR, f"{user_id}.txt")
    # Append log entry to file
    with open(user_log_file, 'a') as f:
        f.write(log_entry)

    return jsonify({"message": "successfully recorded"}), 200


@app.route('/logs', methods=['GET'])
def get_logs():

    user_id = request.args.get("userID")

    if not user_id:
        return jsonify({"error": "userID is missing"}), 400

    #retrieve logs for the given userID
    user_logs = os.path.join(LOGS_DIR, f"{user_id}.txt")

    #Read logs for the given userID
    if os.path.exists(user_logs):
        with open(user_logs, 'r') as f:
            user_logs = [line.strip() for line in f.readlines()]

    else:
        user_logs = []

    return jsonify({"logs": user_logs}), 200


@app.route('/logs', methods=['DELETE'])
def clear_logs():
    user_id = request.args.get("userID")

    if not user_id:
        return jsonify({"error": "userID is missing"}), 400

    # File path for the user's logs
    user_log_file = os.path.join(LOGS_DIR, f"{user_id}.txt")

    if os.path.exists(user_log_file):
        os.remove(user_log_file)

    return jsonify({"logs": "Activity log cleared"}), 200

@app.route('/timer', methods=['GET', 'POST'])
def timer():
    return jsonify({"message": "Pomodoro timer backend active"}), 200


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)
