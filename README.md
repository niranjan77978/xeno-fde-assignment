# 🚀 Xeno FDE Internship Assignment - Shopify Data Ingestion & Insights

A full-stack multi-tenant application that ingests real-time data from a Shopify store, stores it in a relational database with tenant isolation, and visualizes key business metrics on a modern dashboard.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)

---

## ✨ Features
* **Shopify Integration:** Connects to Shopify Admin API to fetch Orders and Customers.
* **Data Ingestion Service:** An ETL pipeline that syncs data into a local database using an `upsert` strategy to prevent duplicates.
* **Multi-Tenancy:** Implements data isolation at the database level using a `shopId` discriminator column for every record.
* **Analytics Dashboard:** A React-based UI with a glassmorphism design to visualize Total Sales, Order Counts, and Sales Trends over time.
* **Dark Mode UI:** Fully responsive, modern dark-themed interface built with raw CSS and Recharts.

---

## 🛠 Tech Stack
* **Frontend:** React.js (Vite), Recharts, CSS Modules.
* **Backend:** Node.js, Express.js.
* **Database:** MySQL.
* **ORM:** Sequelize.
* **External API:** Shopify Admin API (2024-01 version).

---

## 🏗 Architecture
1.  **Ingestion:** The Node.js backend fetches data from Shopify (`orders.json`, `customers.json`) using an Admin Access Token.
2.  **Storage:** Data is mapped to Sequelize models and stored in MySQL tables (`Orders`, `Customers`) with a `shopId` to identify the tenant.
3.  **Visualization:** The React frontend requests aggregated metrics from the backend (`/api/analytics`) and renders them using Recharts.

---

## ⚙ Prerequisites
Before running this project, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)
* A Shopify Development Store (to generate API credentials)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/niranjan77978/xeno-fde-assignment.git](https://github.com/niranjan77978/xeno-fde-assignment.git)
cd xeno-fde-assignment

2. Backend Setup

Navigate to the backend folder and install dependencies:
Bash

cd backend
npm install

Configure Environment Variables: Create a .env file inside the backend/ folder and add the following:
Code snippet

PORT=5000
DB_NAME=xeno_fde
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
dialect=mysql

# Shopify Credentials
SHOPIFY_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx
SHOP_DOMAIN=your-store.myshopify.com

Start the Backend Server: This will automatically sync the database tables.
Bash

node server.js

Output should say: ✅ Server running on http://localhost:5000
3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies:
Bash

cd frontend
npm install

Start the React App:
Bash

npm run dev

Click the link provided (usually http://localhost:5173) to view the dashboard.
📡 API Endpoints
Method	Endpoint	Description
POST	/api/sync-data	Triggers the ingestion process to fetch data from Shopify.
GET	/api/analytics/total-sales	Returns aggregated metrics (Total Sales, Orders, Customers).

2. Database Schema (MySQL)

(Place your MySQL Workbench screenshot here)
👨‍💻 Author

Niranjan Kumar Chaurasiya

    Built for the Xeno Forward Deployed Engineer Internship Assignment.
