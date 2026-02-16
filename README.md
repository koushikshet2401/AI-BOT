# 🧠 NexaAI — Full Stack AI Chat Application

<p align="center">
  <img src="./img/Nexa-home.png" width="500"/>
</p>

NexaAI is a modern full-stack AI-powered chat application built using the MERN stack and integrated with Groq's ultra-fast inference engine.  
It allows users to engage in intelligent, context-aware conversations with secure authentication and persistent chat history.

---

## 🚀 Features

- 🔐 Secure Authentication (JWT + HTTP-only cookies)
- 💬 Context-aware AI conversations
- ⚡ Ultra-fast AI responses using Groq
- 🗂️ Persistent chat storage with MongoDB
- 📜 Conversation history management
- 🎨 Clean, responsive UI built with React
- 🔄 RESTful backend architecture

---

## 🧭 Workflow Architecture

<p align="center">
  <img src="img/Nexa-WorkFlow.png" width="500"/>
</p>

### System Flow

```
User interacts with React UI
        ↓
Authentication (JWT)
        ↓
User sends message
        ↓
Express server receives request
        ↓
Previous chat history fetched from MongoDB
        ↓
Prompt sent to Groq AI model
        ↓
AI generates contextual response
        ↓
Response stored in database
        ↓
Updated conversation displayed in UI
```

---

## 📸 Application Screenshots

### 🏠 Home Page
<p align="center">
  <img src="./img/Nexa-home.png" width="500"/>
</p>

---

### 🔐 Login Page
<p align="center">
  <img src="./img/nexa-login.png" width="500"/>
</p>

---

### 📝 Signup Page
<p align="center">
  <img src="./img/Nexa-signup.png" width="500"/>
</p>

---

### 💬 Chat Interface
<p align="center">
  <img src="./img/Nexa-chat.png" width="500"/>
</p>

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Context API
- Axios
- Custom CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### AI Integration
- Groq API (LLaMA models)

### Authentication
- JWT
- Cookie Parser

---

## 📂 Project Structure

```
CHAT_APP
 ├── backend
 │    ├── src
 │    ├── index.js
 │    └── package.json
 │
 ├── frontend
 │    ├── src
 │    └── package.json
 │
 └── img
      ├── Nexa-chat.png
      ├── Nexa-home.png
      ├── nexa-login.png
      ├── Nexa-signup.png
      └── Nexa-Workflow.png
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/koushikshet2401/AI-BOT.git
cd CHAT_APP
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
GROQ_API_KEY=your_groq_api_key
```

Start backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🔮 Future Improvements

- 📂 Sidebar with multiple conversation sessions
- 🖼️ Image analysis using multimodal AI
- 🎙️ Voice-to-text integration
- ⚡ Streaming AI responses (typing effect)
- 🌍 Cloud deployment (AWS / Vercel)
- 🧾 Export chat as PDF

---

## 🎯 What I Learned

- Building scalable MERN architecture
- Secure authentication with JWT
- Managing conversation state in database
- Integrating third-party AI APIs
- Designing structured backend controllers
- Error handling & async flow management

---

## 👨‍💻 Author

**Koushik Shet**

If you like this project, give it a ⭐ on GitHub!

---
