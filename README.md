# 💼 Job Listing App
This is a simple job board application built with React and Bootstrap. It fetches jobs from a public API and also allows users to add custom job listings. Jobs can be searched and filtered, and detailed views are shown in a modal.

## 🛠️ Getting Started

Follow the steps below to set up and run the app locally.

1. Clone the Repository

```bash
git clone https://github.com/SAgeWaweru/MiniJobBoard.git
cd MiniJobBoard
```

2. Install Dependencies
Make sure you have Node.js installed. Then install the required packages:

```bash
npm install react react-dom react-bootstrap bootstrap axios vite

```

3. Set Up Environment Variables
If you're using an environment file (optional), create a .env file and add the API URL:

```bash
VITE_JOB_API_URL=https://remotive.io/api/remote-jobs
```
Or update the URL directly in your JOB_URL constant in the code.

4. Run the App

```bash
npm run dev
```
The app should now be running at: http://localhost:5173

### 📦 Features
- Fetches remote jobs from the Remotive API

- Add new custom jobs (stored temporarily in memory)

- Modal view for detailed job information

- Spinner while loading

- Search functionality

- Responsive layout using Bootstrap

### 🔧 Tech Stack
- React

- Bootstrap

- Axios

- Vite