# PROJECT-COINSTACK
This is our final project our group did after the course completion

---

# CoinStack

CoinStack is a secure, user-friendly cryptocurrency platform designed for effortless buying, selling, and managing of crypto investments. It integrates real-time market data via the CoinGecko API and emphasizes security with features like secure login, two-factor authentication, and password recovery.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Cloning the Repository](#cloning-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Integration](#api-integration)
- [Payment Gateways](#payment-gateways)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## Overview

CoinStack is built to provide an optimal crypto experience with seamless portfolio management, wallet-to-wallet transfers, bank withdrawals, and balance top-ups. The platform is designed for scalability and high performance, ensuring security and ease-of-use throughout the user journey.

**Key Changes from Previous Implementations:**
- **Old Implementation:** Used Express, Node.js, and Sequelize ORM for CRUD operations with a MySQL database along with Alpha Vantage for stock market data.
- **New Implementation:** Transitioned to Spring Boot for a more robust backend with the integration of the CoinGecko API to support cryptocurrency market data.

---

## Features

- **User Management & Security:** Secure login, two-factor authentication, and password recovery.
- **Portfolio Management:** View and manage cryptocurrency investments.
- **Transaction History:** Detailed history of all transactions.
- **Wallet-to-Wallet Transfers:** Seamless crypto transfers between users.
- **Real-Time Data Integration:** Live cryptocurrency data via the CoinGecko API.
- **Payment Integration:** Integrated with Razorpay for processing payments.
- **Modern UI:** Frontend built with React, Tailwind CSS, and Shadcn UI for a responsive and sleek design.

---

## Tech Stack

### Backend
- **Framework:** Spring Boot
- **Database:** MySQL
- **Security:** Spring Security, JWT 
- **Mail Services:** Java Mail Sender
- **API Integration:** CoinGecko API

### Frontend
- **Framework:** React
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** Redux
- **HTTP Client:** Axios
- **Routing:** React-Router-Dom

### Payment Gateways
- **Razorpay**

---

## Project Structure

```
PROJECT-COINSTACK/
├── ER Diagram                # Entity Relationship Diagram for the database design.
├── Frontend                  # React-based frontend application.
├── Backend                   # New backend implementation using Spring Boot.
└── Old-Backend               # Legacy backend implementation using Express, Node.js, Sequelize ORM, and Alpha Vantage API.
```

---

## Getting Started

### Cloning the Repository

Clone the project using the GitHub CLI:

```bash
gh repo clone krishnabhavsar10/PROJECT-COINSTACK
```

Alternatively, you can clone using Git:

```bash
git clone https://github.com/krishnabhavsar10/PROJECT-COINSTACK.git
```

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd PROJECT-COINSTACK/Frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application:**

   ```bash
   npm start
   ```

This should launch the React application on your local development server.

### Backend Setup

#### For Spring Boot Implementation:

1. **Navigate to the Backend Directory:**

   ```bash
   cd PROJECT-COINSTACK/Backend
   ```

2. **Build the Project:**

   Use Maven or Gradle (depending on your project configuration):

   ```bash
   ./mvnw clean install
   ```

3. **Run the Application:**

   ```bash
   ./mvnw spring-boot:run
   ```

Ensure that your MySQL database is up and running and that the application properties are configured properly (e.g., database URL, username, password).

---

## API Integration

- **CoinGecko API:**  
  The new backend fetches real-time cryptocurrency market data from the [CoinGecko API](https://www.coingecko.com/en/api).  
  Ensure you have the proper API keys or usage configuration as needed in your Spring Boot application.

- **Legacy API:**  
  The old backend used the Alpha Vantage API for stock market data. Although this is no longer the focus, the implementation is preserved in the `Old-Backend` folder for reference.

---

## Payment Gateways

CoinStack supports seamless payment processing with:

- **Razorpay**

Configuration details and API keys should be securely stored in your environment variables or application configuration files.

---

## Contribution Guidelines

Contributions are welcome! If you’d like to contribute to CoinStack, please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/YourFeature`)
3. **Commit Your Changes** (`git commit -m 'Add some feature'`)
4. **Push to the Branch** (`git push origin feature/YourFeature`)
5. **Open a Pull Request**

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

---


## Contact

For any questions or feedback, please reach out to:

- **Krishna Bhavsar**  
  [GitHub Profile](https://github.com/krishnabhavsar10)

---

## Acknowledgments

- Thanks to the developers and contributors of the libraries and tools that made CoinStack possible.
- Special thanks to the API providers such as CoinGecko for real-time data and the payment gateway teams for seamless integrations.

---
