# CodeLabz Feature Demo 🚀

> A feature-rich demonstration project built to showcase core technical capabilities and system architecture for the **Google Summer of Code (GSoC) 2026 CodeLabz** contribution.

This project focuses on building a robust foundation combining React, Material UI, and Realtime Database integrations—designed with cleanly separated components, strongly typed structures, and automated deployment pipelines.

## 🌟 Features

- **Firebase Authentication**: Secure user onboarding via scalable external auth.
- **Role-Based Access Control (RBAC)**: Enforced internal roles mapping permissions dynamically across `Admin`, `Editor`, and `Viewer` personas.
- **Real-time Notifications**: Integrated Firebase Realtime Database pushing sub-second instant feedback and alerts directly into the UI state.
- **Admin Dashboard**: Dedicated portal limited securely to `Admin` users permitting realtime view and moderation of users and global application statistics.
- **Multi-Stage Docker Support**: Zero-friction setup process backed via an ultra-lean Nginx final web serving container for peak production behavior.
- **CI/CD with GitHub Actions**: Fully automated pipelines checking code health, ensuring dependencies resolve perfectly, and blocking broken deployment commits immediately.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Backend as a Service**: Firebase (Auth & Realtime Database)
- **UI Library**: Material UI (MUI)
- **Containerization**: Docker & Docker Compose
- **Pipeline**: GitHub Actions CI/CD

---

## 🚀 Setup Instructions

Follow these simple instructions to fetch and operate your local development environment:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kaundeep11/codelabz-feature-demo.git
   cd codelabz-feature-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   Ensure you provide valid, existing environment credentials inside `src/firebase.ts` connecting your code securely to a living Firebase instance.

4. **Start the local development server:**
   ```bash
   npm start
   ```
   *Note: This will deploy using standard CRA scripts. If you modify your backend configuration, restart the server.*

---

## 🐳 Docker Setup

Skip the local environment hustle entirely. Start the fully containerized application spanning the multi-stage build directly from Docker Compose:

1. **Build and spin up the environment:**
   ```bash
   docker-compose up --build
   ```

2. Open your browser and navigate to `http://localhost:3000`.

---

## 📸 Screenshots

<!-- TODO: Insert images here documenting the UI -->
- *Dashboard View Placeholder*
- *Admin Portal Placeholder*
- *Real-time Notifications Demo Placeholder*

---

## 📄 License

This project is open-source and available under the **[MIT License](LICENSE)**.
