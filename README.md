# Diego's Pomodoro

Welcome to Diego's Pomodoro! This is a fully functional web application designed to enhance productivity by implementing the Pomodoro technique. Users can manage their Pomodoro sessions, view a detailed activity log, and track actions performed during the timer.

## Features

### Timer Modes

- **Work Mode**: 25-minute focused work session.
- **Short Break Mode**: 5-minute short break.
- **Long Break Mode**: 15-minute long break.
- Switch between modes seamlessly.

### Personalized Activity Log

- Logs each action taken during the session.
- Displays timestamps, events, modes, and durations.
- Session-specific logs are tied to a unique user ID.
- Logs are automatically cleared when the page is reloaded.

### Personal Touch

- The timer features an alarm sound, "Sonata di Fantaisie," a musical piece composed by the developer.

## Technologies Used

### Frontend

- **React.js**: Used for developing an interactive and responsive user interface.
- **REST API**: Facilitates communication between the frontend and backend.

### Backend

- **Python & Flask**: Manages the backend logic and API endpoints.
- **CORS**: Enables seamless communication between frontend and backend.
- **User-Specific Logs**: Each user session generates a unique ID to maintain personalized logs.

### Deployment

- **Netlify**: Hosts the frontend.
- **Flask**: Powers the backend on a separate server.

## How It Works

1. Users are assigned a unique ID upon visiting the site.
2. Actions (e.g., starting, stopping, or resetting the timer) are logged with timestamps.
3. Logs are displayed in the Activity Log tab for the duration of the session.
4. Reloading the page clears all session data and starts a fresh session.

## Installation

### Prerequisites

- Node.js and npm
- Python 3.x

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/pomodoro.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd pomodoro/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd pomodoro/backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```

### Deployment

- Deploy the frontend to Netlify and configure environment variables for the API.
- Host the backend on a Flask-compatible server.

## Future Enhancements

- Add user authentication for persistent data across sessions.
- Provide analytical insights based on user activity.
- Enable customization of timer durations.

## Feedback

Feedback is always welcome! Feel free to share your thoughts or suggestions for improvement by contacting me or submitting an issue in the repository.

---

Thank you for exploring Diego's Pomodoro. Let's make productivity fun!

