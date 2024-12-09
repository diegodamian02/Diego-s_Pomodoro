
# Pomodoro Timer

A web-based Pomodoro timer built with React.js (frontend) and Flask (backend). This project helps users manage their time efficiently using the Pomodoro Technique, complete with logging and activity tracking.

## Features
- **Timer Modes**: Work, Short Break, and Long Break.
- **Activity Log**: Track session durations and events (e.g., timer started, stopped, or reset).
- **Responsive Design**: Mobile-friendly user interface.
- **Backend**: Built with Flask to handle logging and activity management.

## Installation
### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React app:
   ```bash
   npm start
   ```

## Deployment
The project can be deployed to hosting platforms:
- **Frontend**: [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
- **Backend**: [Render](https://render.com) or [Heroku](https://heroku.com).

## Live Demo
- **Frontend**: [Frontend URL](https://your-frontend.netlify.app)
- **Backend**: [Backend URL](https://your-backend.onrender.com)

## Project Structure
```
pomodoro-timer/
├── backend/             # Flask backend
│   ├── app.py           # Main Flask app file
│   ├── requirements.txt # Python dependencies
│   └── ...              # Other backend files
│
├── frontend/            # React frontend
│   ├── public/          # Public folder for React
│   ├── src/             # React source files
│   ├── package.json     # Frontend dependencies
│   └── ...              # Other frontend files
│
├── .gitignore           # Excluded files
├── README.md            # Project documentation
```

## How It Works
1. The **frontend** provides a timer interface and interacts with the backend via API calls.
2. The **backend** manages activity logs and processes user requests.

## Technologies Used
- **Frontend**: React.js, HTML, CSS
- **Backend**: Flask, Python
- **Hosting**: Netlify (frontend), Render (backend)

## Contributing
Contributions are welcome! Feel free to fork this repository and submit pull requests.

---

**Made with ❤️ by Diego**
