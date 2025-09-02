# Django + React Hello World

A simple beginner project to connect **Django REST Framework (backend)** with **React (frontend)**.  
The backend provides an API endpoint returning `"Hello World"`, and the frontend fetches and displays it.  

---

## ⚙️ Tech Stack  
- **Backend**: Django, Django REST Framework  
- **Frontend**: React, Axios  
- **Others**: django-cors-headers  

---

## 📂 Project Structure  
```
project-root/
│
├── backend/         # Django Backend
│   ├── api/         # API app
│   ├── backend/     # Main Django project
│   └── manage.py
│
└── frontend/        # React Frontend
    ├── src/
    └── package.json
```

---

## 🛠 Setup Instructions  

### 1️⃣ Backend (Django API)  

1. Navigate to backend folder:
```bash
cd backend
```

2. Create virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

3. Install dependencies:
```bash
pip install django djangorestframework django-cors-headers
```

4. Run server:
```bash
python manage.py runserver
```

API will be available at:  
👉 `http://127.0.0.1:8000/api/hello/`  

It should return:
```json
{"message": "Hello World"}
```

---

### 2️⃣ Frontend (React App)  

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start React app:
```bash
npm start
```

Frontend will run at:  
👉 `http://localhost:3000/`

You should see:
```
Django + React Test
Hello World
```

---

## 🔗 API Endpoints  

| Method | Endpoint          | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/hello/`    | Returns `"Hello World"` |

---

## 📸 Screenshot  
*(Optional: You can add a screenshot once project is running)*  

---

## 🚀 Next Steps  
- Add a **POST endpoint** to send a custom message.  
- Display multiple messages on the frontend.  
- Move on to **Project 2: Todo App**.  
