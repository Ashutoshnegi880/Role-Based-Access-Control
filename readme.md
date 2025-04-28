# Role-Based Access Control (RBAC) Blog Platform

A secure blog application implementing **Role-Based Access Control (RBAC)**, where different users have different permissions (e.g., Admins and Users).  
Admins can create, update, delete blogs, while Users can only view them.

The project uses:
- **Node.js** with **Express.js** for backend
- **PostgreSQL** for database
- **JWT** for authentication
- **HTML/CSS/JavaScript** for frontend
  
---

## Features
- Secure signup/login with password hashing.
- Role-based access (user/admin).
- Admin dashboard for managing blogs.
- View for full blog content.

---

## Database Setup

Run the following SQL commands to create the necessary tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) DEFAULT 'user' -- user, admin
);

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Getting Started

Follow these steps to set up the project on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/ashutoshnegi880/role-based-access-control.git
cd role-based-access-control
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Inside the project root, create a `.env` file with the following environment variables:

```env

PORT=3000
JWT_SECRET=your_jwt_secret_key
DB_USER= db_user_name
DB_PASSWORD= db_password
DB_HOST= your_db_host
DB_PORT= your_db_port
DB_DATABASE= db_name
```

### 4. Run the server

For development (with auto-restart using nodemon):

```bash
npm run dev
```

Or to run normally:

```bash
npm start
```

The server will start at:  
[http://localhost:3000](http://localhost:3000)

---

## Important URLs

- `/signup` — Signup page
- `/login` — Login page
- `/blogs` — User blogs listing
- `/admin` — Admin dashboard (create, delete blogs)

---

## License

This project is licensed under the MIT License.  

---
