# Node.js Auth & Posts App

A mini social media–style web application built using **Node.js, Express, MongoDB, JWT authentication, EJS, and TailwindCSS**.  
Users can register, log in, create posts, like/unlike posts, edit posts, and view their profile.

---

## 🚀 Features

### ✅ User Authentication
- Register with hashed passwords using **bcrypt**
- Login with **JWT-based authentication**
- Token stored in cookies
- Protected routes using middleware

### ✅ Posts System
- Create posts
- Each post is linked to the logged-in user
- Auto timestamp
- Edit post content

### ✅ Like System
- Like/unlike any post
- Toggle method implemented using logic
- Like count increases/decreases

### ✅ Profile Page
- Displays user information
- Shows all posts created by the user
- Uses `.populate()` to fetch posts from MongoDB

### ✅ Logout
- Clears authentication cookie
- Redirects back to login

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt

### Frontend
- EJS (server-side templates)
- TailwindCSS

---

## 📂 Folder Structure

project/
│
├── models/
│ ├── user.js
│ └── post.js
│
├── views/
│ ├── index.ejs
│ ├── login.ejs
│ ├── profile.ejs
│ ├── edit.ejs
│ └── register.ejs
│
├── public/
│
├── app.js
├── package.json
└── README.md


---

## 🔐 Authentication Flow

1. User logs in using email/password  
2. Password checked using bcrypt  
3. If valid → JWT generated  
4. JWT stored in cookies  
5. Middleware verifies the token  
6. User gets access to profile, create post, like, edit, etc.

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/PRAKASH-135/nodejs-auth-posts-app.git

2. Install dependencies
npm install

3. Start MongoDB

(Make sure MongoDB is running)

4. Run the server
node app.js


Visit:

http://localhost:3000

🧪 API Routes
Method	Route	Description
GET	/	Home page
GET	/login	Login page
POST	/login	Login API
POST	/register	Register API
GET	/profile	Profile page (Protected)
POST	/post	Create new post
GET	/like/:id	Like/Unlike
GET	/edit/:id	Edit post page
POST	/update/:id	Update post content
GET	/logout	Logout
🌟 Future Enhancements

Comments on posts

User followers system

Image upload using Cloudinary

Move to MVC folder structure

Add rate limiting & better error handling

🤝 Contributing

Pull requests and suggestions are welcome!

📜 License

This project is open-source and licensed under the MIT License.


---

Bro you're all set — paste this into `README.md` and push it 👍  
If you want a `.gitignore` file too, tell me and I’ll generate it.