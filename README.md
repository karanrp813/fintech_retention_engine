# 🏦 Fintech Retention Engine

**A Full-Stack AI Application to predict customer churn risk in real-time.**

![Project Status](https://img.shields.io/badge/Status-Complete-green)
![Python](https://img.shields.io/badge/Python-3.9-blue)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.68-009688)

## 📖 Project Overview
In the competitive Fintech landscape, customer retention is critical. This application uses Machine Learning to identify high-risk customers *before* they leave. 
It features a decoupled architecture with a **FastAPI** backend serving predictions from a **Random Forest** model, and a **React + Tailwind** frontend delivering a modern "Glassmorphism" UI for business users.

**Business Value:**
* **Reduces Churn:** Identifies at-risk users with **86% accuracy**.
* **Explainable AI:** Provides confidence scores to help Loan Officers make data-driven decisions.
* **Real-Time:** Delivers predictions in <100ms via REST API.

---

## 📸 Screenshots
*(Add a screenshot of your Glossy UI here showing a "High Risk" prediction)*
> *The Dashboard alerting a Risk Manager of a high-churn probability customer.*

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS (Glassmorphism UI)
* **Backend:** FastAPI, Uvicorn, Pydantic
* **Machine Learning:** Scikit-Learn (Random Forest Classifier), Pandas, NumPy
* **Data Pipeline:** Custom ETL pipeline with Scikit-Learn `ColumnTransformer` (StandardScaler + OneHotEncoder)

---

## 🏗️ Architecture
The project follows a production-grade directory structure:
```text
fintech_retention_engine/
├── data/             # Raw and processed CSV data
├── models/           # Serialized .pkl models (Model + Preprocessor)
├── notebooks/        # Jupyter Notebooks for EDA and Experiments
├── src/              # Source code for API and Training
│   ├── api.py        # FastAPI endpoints
│   ├── train.py      # ML Training pipeline
│   └── preprocess.py # Data transformation pipeline
└── frontend/         # React Application

```

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone [https://github.com/YOUR_USERNAME/fintech_retention_engine.git](https://github.com/YOUR_USERNAME/fintech_retention_engine.git)
cd fintech_retention_engine

```

### 2. Backend Setup (Python)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API Server
uvicorn src.api:app --reload

```

### 3. Frontend Setup (React)

```bash
# Open a new terminal
cd frontend
npm install
npm run dev

```

### 4. Access the App

Open your browser to `http://localhost:5173` to view the Dashboard.
Access the API Docs at `http://127.0.0.1:8000/docs`.

---

## 📊 Model Performance

* **Algorithm:** Random Forest Classifier (n_estimators=100)
* **Accuracy:** 86.1%
* **Key Insight:** Age and Activity Status were the strongest predictors of churn.

---

## 📬 Contact

* **Your Name** - [LinkedIn Profile Link]
* **Email:** your.email@example.com

```

### **Step 2: Add the "Money Shot" (Screenshot)**
A text-only README is boring.
1.  Run your app (`npm run dev` & `uvicorn...`).
2.  Enter the "High Risk" data (Germany/Age 60).
3.  Take a screenshot of the **Red Alert** result.
4.  Save the image in your project folder as `demo_screenshot.png`.
5.  In the `README.md` code above, find the line `*(Add a screenshot...)*` and change it to:
    `![Dashboard Demo](demo_screenshot.png)`

### **Step 3: Push to GitHub**
Now, let’s upload it. Open your VS Code terminal (Root folder):

1.  **Initialize Git:**
    ```bash
    git init
    ```
2.  **Add files (Your .gitignore will handle the rest):**
    ```bash
    git add .
    ```
3.  **Commit:**
    ```bash
    git commit -m "Initial commit: Fintech Retention Engine v1.0"
    ```
4.  **Connect to GitHub:**
    * Go to GitHub.com -> **New Repository** -> Name it `fintech_retention_engine`.
    * **Do not** add a readme/gitignore (you already have them).
    * Copy the 3 lines under **"…or push an existing repository from the command line"**.
    * Paste them into your VS Code terminal.

---

### **Step 4: The Resume Bullet Point**
You can now add this to your resume under "Projects." Here is the "Senior IT" phrasing:

> **Fintech Customer Retention Engine** | *Python, React, Scikit-Learn*
> * Engineered an end-to-end churn prediction system achieving **86% accuracy** using Random Forest and Python.
> * Developed a REST API using **FastAPI** to serve real-time risk assessments to downstream applications.
> * Built a modern, responsive dashboard using **React and Tailwind CSS** to visualize risk metrics for business stakeholders.
> * Implemented a robust data preprocessing pipeline using **Scikit-Learn ColumnTransformer** to prevent feature leakage.

**Final Check:**
You have built a full stack Data Science application.
* **Data:** Processed.
* **Math:** Solved.
* **Backend:** Serving.
* **Frontend:** Glowing.

**Would you like me to help you brainstorm the "Business Value" points further for your interview prep?**

```