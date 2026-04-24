# Cloud_Computing_Assignment_2
# Music Subscription Web Application

## Course
Cloud Computing COSC2626/2640  

## Group
Group 32  

## Members
- Aanchal  
- Moin Kousar Botlapalem Shaik  
- Himanshu Avadheshsinh Chauhan  
- Caitlyn Taylor  

---

## Overview
This project is a cloud-based music subscription web application built using AWS services.  
Users can register, log in, search for songs, and manage their subscriptions.

The system demonstrates three backend architectures:
- Amazon EC2 (Flask)
- Amazon ECS (containerised Flask)
- API Gateway + AWS Lambda (serverless)

---

## Features
- User registration with duplicate email validation  
- User login with credential checking  
- Session management using sessionStorage  
- Search songs by Title, Artist, Album, or Year  
- Subscribe to songs  
- Remove subscriptions  
- Artist images retrieved from S3  

---

## Project Structure
project-root/
│
├── frontend/  
├── backend-ec2/  
├── backend-ecs/  
├── backend-lambda/  
├── scripts/  
├── report.pdf  
├── worklog.pdf  

---

## How to Run (Frontend)
1. Open the `frontend/` folder  
2. Open `login.html` in a browser  

---

## Backend Connection
To connect to a backend, update `config.js`:

const API_BASE_URL = "YOUR_BACKEND_URL";
const USE_MOCK_DATA = false;

---

## Mock Mode
For testing without backend:

const USE_MOCK_DATA = true;

---

## API Endpoints
- POST /register  
- POST /login  
- POST /logout  
- GET /songs  
- GET /subscriptions  
- POST /subscriptions  
- DELETE /subscriptions  

---

## Notes
- Frontend is built using HTML, CSS, and JavaScript  
- Session management uses sessionStorage  
- DynamoDB is used for data storage  
- S3 is used for storing artist images  

---

## Demo Instructions
1. Register a new user  
2. Log in  
3. Search for songs  
4. Subscribe to a song  
5. Remove a subscription  
6. Log out  

---
