# fullstackassignment

Authentication System with 2FA, Device Management, and Security Features

Overview

This project implements a secure Authentication System using the MERN stack (MongoDB, Express, React, Node.js). It features Two-Factor Authentication (2FA), device management, rate limiting for security, and protection against SQL/NoSQL injection and XSS attacks.

Features:

1. User Authentication: Registration, login, and JWT-based session management.
2. Two-Factor Authentication (2FA): Optional 2FA using OTP sent via email.
3. Device Management: Track sessions with device type, browser, location, and login timestamp.
4. Rate Limiting: Protect against brute-force login attempts.
5. Input Validation and Sanitization: Protection against NoSQL injection and XSS attacks.
6. Security Measures: Uses bcrypt for password hashing, express-rate-limit for rate limiting, and xss-clean for XSS protection.

Project Setup:

Prerequisites:

1. Node.js (latest stable version)
2. MongoDB (local instance or cloud-based, e.g., MongoDB Atlas)
3. Nodemailer (for sending emails via Mailtrap or other SMTP service)
4. ReactJS (latest stable version)
5. Material UI
6. Axios
7. Redux Toolkit
8. React Router DOM
9. Git

Installation:

Step 1: 1. Clone the repository: git clone https://github.com/reevarP/fullstackassignment.git 2. Go to root directory: cd fullstackassignment
Step 2: 1. Go to backend directory: cd backend 2. Install dependencies: npm install
Step 3: 1. Go to frontend directory: cd ../frontend 2. Install dependencies: npm install
Step 4: 1. Create a .env file in both the frontend and backend
Step 5: 1. Start the backend: cd backend 2. npm start
Step 6: 1. Start the frontend: ../frontend 2. npm start

Technologies Used

1. Frontend: React.js
2. Backend: Node.js, Express.js
3. Database: MongoDB
4. Authentication: JWT (JSON Web Token)
5. Two-Factor Authentication (2FA): OTP via email using Nodemailer
6. Security: bcrypt, express-rate-limit, xss-clean
7. Geolocation: geoip-lite
8. User-Agent Parsing: useragent

File Structure

1/fullstackassignment

    /frontend # React frontend
        /src
        /public
        package.json
        .env

    /backend # Express backend
        /models # Mongoose schemas (e.g., User.js)
        /routes # API routes (e.g., auth.js, profile.js)
        /middleware # Custom middleware (e.g., authMiddleware.js)
        package.json
        .env

    .gitignore # Ignore node_modules and environment files
    README.md # Project documentation

Features and Endpoints

    User Registration
        Endpoint: /api/auth/register
        Method: POST
        Description: Register a new user with a hashed password.
        Request Body:
        {
            "username": "exampleUser",
            "email": "example@example.com",
            "password": "yourPassword"
        }
        Response: JWT token upon successful registration.

    User Login
        Endpoint: /api/auth/login
        Method: POST
        Description: Login a user using email and password.
        Request Body:
        {
            "email": "example@example.com",
            "password": "yourPassword"
        }
        Response: JWT token upon successful login.

    Two-Factor Authentication (2FA)
        OTP Generation: If 2FA is enabled for the user, an OTP is generated and sent to the user's email.
        OTP Verification Endpoint: /api/auth/verify-otp
        Request Body:
        {
            "userId": "user-id",
            "otp": "123456"
        }
        Response: JWT token upon successful verification.

    Device and Session Management
        Device Tracking: The user's device, browser, location, and login timestamp are tracked.
        Session Listing Endpoint: /api/user/sessions
        Log Out from a Specific Session: /api/user/logout-session

Security Measures

    Rate Limiting
        Implemented Using: express-rate-limit
        Endpoint: /api/auth/login (rate-limited to 5 login attempts per minute)

    NoSQL Injection and XSS Protection
        NoSQL Injection Prevention: Mongoose protects against injection by sanitizing queries.
        XSS Protection: xss-clean sanitizes all incoming requests to prevent XSS attacks.

    Input Validation and Sanitization
        Implemented Using: express-validator
        Validation: Email format, password length, and other checks are applied on registration and login.

Environment Variables

    Create a .env file in both frontend and backend directories with the following variables:
    
        Backend (backend/.env):
            MONGO_URI=your_mongo_db_connection_string
            JWT_SECRET=your_jwt_secret
            EMAIL_USER=your_email@example.com
            MAILTRAP_USER=your_mailtrap_username
            MAILTRAP_PASS=your_mailtrap_password
            
        Frontend (frontend/src/Services/constants.js):
            baseUrl=http://localhost:3001

I have used my own URIs and Username and Passwords so I cannot provide you with that. Please create your accounts on mailtrap and mongodb.

For JWT_SECRET, you can just enter anything(something like, abcd123456789).

For EMAIL_USER, you can enter any email ID. This will be the email ID that will be used to send the email. Mailtrap is used for testing so you can enter anything but in production, other email services will be used like, AWS etc and those credentials will be used in the nodemailer.
