# ✈️ TriplyAI – AI-Powered Travel Planner

TriplyAI is an intelligent travel planning guide that helps users plan trips effortlessly using AI.  
It guides users step-by-step through destination selection, budget planning, travel duration, and personalized recommendations.

---


## 🛠 Tech Stack

- **Frontend:** Next.js, React, TypeScript  
- **Styling:** Tailwind CSS 
- **Authentication:** Clerk  
- **Database:** NeonDB (PostgreSQL)  
- **Deployment:** Vercel  

---

### ⚙️ Installation Guide 

### 1️⃣ Prerequisites

- A **NeonDB (PostgreSQL)** database
- A **Clerk** account for authentication

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/AnandBhalla/TriplyAI
```

### 3️⃣ Install Dependencies

```bash
npm install
```
### 4️⃣ Setup Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
GEMINI_API_KEY=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

### 6️⃣ Run the Development Server

```
npm run dev
```