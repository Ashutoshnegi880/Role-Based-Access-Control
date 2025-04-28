# Role-Based-Access-Control
implement a Role-Based Access Control (RBAC) system in a blog platform. The goal is to create a secure application where different roles have distinct permissions, such as admin and user.


#Create the db using below commands
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