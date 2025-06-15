
# Job Board Application

A basic job board built with **Node.js** (backend) and **Next.js** (frontend) using TypeScript and PostgreSQL (BONUS).

---

## Features

### Admin Features

- **Login:**  
  - Email: `admin@example.com`
  - Password: `admin123`
- **Job Management:**  
  - Create new job listings
  - View submitted applications
  - (BONUS) Accept or reject applications

**Job Listing Fields:**  
- Job Title  
- Department  
- Location  
- Description  
- Posting Date

---

### Applicant Features

- **View Job Listings:**  
  - Browse open jobs (public page)
  - View job details
- **Apply for Jobs:**  
  - Submit application with:
    - Full Name (2-32 characters)
    - Email
    - Phone Number
    - Resume (PDF only, BONUS)
    - Cover Letter (BONUS)
- **Application Rules:**  
  - Only one application per job per applicant
  - Max 5 candidates per job (BONUS: can be adjusted)
  - Max 5 jobs per applicant in 24 hours (BONUS: rejected applications don’t count)
  - No application without contact info (email & phone)
  - No application if job has 5 active applications

---

## Technologies

- **Backend:** Node.js (TypeScript BONUS)
- **Frontend:** Next.js (TypeScript BONUS)
- **Database:** PostgreSQL (BONUS)
- **Other:** React, react-hook-form, zod, axios, sonner (toasts), shadcn/ui, tailwind

---

## Project Structure

```
.
├── backend/         # Node.js backend
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/        # Next.js frontend
│   ├── app/
│   ├── package.json
│   └── ...
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

**Environment Setup:**  
Create a `.env` file in the `backend` folder with your database and secret variables. :

```env
DATABASE_URL="postgresql://postgres.bxbqkeakwkxznysdfecz:IesIAmDgx0DIotdW@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="KJBbsf7^FS&*7^" 
```

**Backend:**  
Make sure port 5000 is empty as frontend is hardcoded to query that port

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```
---

### 4. Run the Application

**Backend:**

```bash
nodemon start
```

**Frontend:**
```bash
npm run dev
```
---

### 5. Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:5000](http://localhost:5000)

---

## Admin Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`

---

## Checklist

- [x] Resume uploads saved in `/uploads` folder
- [x] README includes setup, tech, and admin credentials
- [x] Application runnable locally with `npm start` or `nodemon`

---

## Notes

- **TypeScript and PostgreSQL are used as BONUS features.**
- **Uploads are stored locally in the `backend/uploads` directory.**
- **Application logic enforces all specified rules for job applications.**


---

