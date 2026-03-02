# HRM Fuel It Online

Human Resource Management System with MongoDB Integration

## 🚀 Features

- 👤 **User Authentication** - Secure signup/login with JWT tokens
- 👥 **Employee Management** - Full CRUD operations (Create, Read, Update, Delete)
- 🔍 **Search & Filter** - Search by name, email, position and filter by department/status
- 📄 **Pagination** - View employees with pagination (5 per page)
- 🎨 **Modern UI** - Clean and responsive design with gradient themes
- 💾 **MongoDB Database** - Persistent data storage with MongoDB Atlas
- 🔐 **Protected Routes** - JWT-based authentication middleware
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 📁 Project Structure

```
hrm-fuelitonline/
├── backend/              # Express.js REST API
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models (User, Employee)
│   ├── routes/          # API routes (auth, employees)
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Entry point
├── frontend/            # React application
│   ├── src/
│   │   ├── Login.js     # Login page
│   │   ├── Signup.js    # Signup page
│   │   ├── home.js      # Employee list
│   │   ├── AddEmployee.js
│   │   ├── EmployeeDetail.js
│   │   └── EmployeeContext.js
│   └── public/
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1
- **React Router DOM** 7.11.0
- **Context API** for state management
- **CSS3** with gradients and animations

### Backend
- **Node.js** v20.19.6
- **Express** 5.2.1
- **MongoDB** with Mongoose
- **JWT** (jsonwebtoken) for authentication
- **bcryptjs** for password hashing
- **CORS** enabled

## 📋 Prerequisites

- Node.js v20 (use nvm to switch: `nvm use 20`)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Hiteshgupta18/hrm_project.git
cd hrm_project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
```

**MongoDB Setup:**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string
- Replace `your_mongodb_connection_string_here` with your actual connection string

Start the backend server:

```bash
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Make sure you're using Node v20:

```bash
nvm use 20
npm start
```

Frontend will run on `http://localhost:3000`

## 🎮 Usage

1. **Signup**: Create a new account at `/signup`
2. **Login**: Login with your credentials at `/login`
3. **Home**: View all employees in a paginated table
4. **Add Employee**: Click "+ Add Employee" to add new employee
5. **View Details**: Click "View Details" to see/edit employee information
6. **Search & Filter**: Use search bar and dropdown filters
7. **Logout**: Click "Logout" button in header

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user (returns JWT token)

### Employees (Protected Routes)
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Add new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- Environment variables for sensitive data
- CORS enabled for cross-origin requests

## 📝 Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Employee Model
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  position: String,
  department: String,
  salary: Number,
  joinDate: Date,
  status: String (Active/Inactive),
  address: String,
  emergency: {
    name: String,
    relationship: String,
    phone: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Deployment

### Backend Deployment (Render/Heroku)
1. Push code to GitHub
2. Connect to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Update API URLs to production backend

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

**Hitesh Gupta**
- GitHub: [@Hiteshgupta18](https://github.com/Hiteshgupta18)

## 📧 Support

For issues or questions, please open an issue on GitHub.
- Pagination
