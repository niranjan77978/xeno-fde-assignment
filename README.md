# 🚀 Xeno FDE Internship Assignment - Shopify Data Ingestion & Insights

A full-stack multi-tenant application that ingests real-time data from a Shopify store, stores it in a relational database with tenant isolation, and visualizes key business metrics on a modern dashboard.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)

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
