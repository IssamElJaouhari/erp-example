# ERP System API - Postman Requests Guide

This document provides step-by-step instructions on how to test authentication and role-based access for the ERP system using Postman.

---

## **1. Register an Admin User**

### **Request:**

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:** None
- **Body (JSON):**
  ```json
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }
  ```
- **Expected Response:**
  ```json
  {
    "_id": "64c3b74e9d2b3e001b96d543",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1..."
  }
  ```

---

## **2. Login as Admin to Get a JWT Token**

### **Request:**

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** None
- **Body (JSON):**
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:**
  ```json
  {
    "_id": "64c3b74e9d2b3e001b96d543",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1..."
  }
  ```
- **Copy the `token` value** from the response.

---

## **3. Use the Token to Access Admin Route**

### **Request:**

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/auth/admin`
- **Headers:**
  ```
  Authorization: Bearer <your_token>
  ```
  _(Replace `<your_token>` with the token received from the login request.)_
- **Body:** ❌ (No body needed)
- **Expected Response (If Admin Role is Valid):**
  ```json
  {
    "message": "Welcome Admin! You have full access."
  }
  ```

---

## **Common Errors & Fixes**

🚫 **401 Unauthorized?**

- Ensure you included `Authorization: Bearer <your_token>` in **Headers**.
- If the token expired, **log in again to get a new one**.

🚫 **403 Forbidden?**

- Check your MongoDB database to ensure the **user role is `admin`**.

🚫 **500 Server Error?**

- Check if the server is running (`npm run dev`).
- Ensure `req.user.role` is being correctly assigned after token verification.

---

## **Postman API Requests Summary**

| Step                   | Method | URL                                       | Headers                              | Body (JSON)                                                                                          |
| ---------------------- | ------ | ----------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Register Admin**     | `POST` | `http://localhost:5000/api/auth/register` | None                                 | `{ "name": "Admin User", "email": "admin@example.com", "password": "password123", "role": "admin" }` |
| **Login as Admin**     | `POST` | `http://localhost:5000/api/auth/login`    | None                                 | `{ "email": "admin@example.com", "password": "password123" }`                                        |
| **Access Admin Route** | `GET`  | `http://localhost:5000/api/auth/admin`    | `Authorization: Bearer <your_token>` | ❌ (No body needed)                                                                                  |

---

## **Next Steps**

- [ ] Add more admin-only routes.
- [ ] Protect resources like user management, inventory, and finance.
- [ ] Move to the frontend (React + Vite Admin Dashboard).

Let me know if you need further improvements! 🚀
