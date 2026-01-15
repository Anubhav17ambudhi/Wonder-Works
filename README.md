# Wonder-Works

**Wonder-Works** (also known as *The Caravan Chronicle*) is a full-stack grievance redressal system designed to streamline the process of submitting, tracking, and resolving citizen complaints.

The core differentiator of this system is its automated **AI Priority Analysis** engine, which uses Generative AI to analyze complaint images and text, assigning urgency levels automatically to help staff triage issues effectively.

## 🚀 Features

### Core Functionality
* **Role-Based Access Control (RBAC):** Distinct workflows for **Staff** (resolvers), and **Admins** (overseers).
* **Complaint Submission:** Citizens can submit detailed grievances including photo evidence.
* **Status Tracking:** Real-time updates on complaint resolution status.

### AI & Automation
* **Automated Priority Analysis:** An asynchronous worker system analyzes incoming complaints (text + images) using the **Gemini API**.
* **Smart Triage:** Automatically tags complaints with priority on scale of 1-10 based on visual severity and textual context.

## 🛠️ Tech Stack

**The MERN Stack + Advanced Services**

* **Frontend:** React.js (Client-side interface)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose ORM)
* **AI Service:** Google Gemini API
## 📂 Project Structure

```bash
wonder-works/
├── client/                 # React Frontend
├── server/
│   ├── config/             # DB connections
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose Schemas (User, Complaint)
│   ├── routes/             # API Endpoints
│   ├── workers/            # (AI Analysis Logic)
│   └── index.js            # Entry point
└── README.md
