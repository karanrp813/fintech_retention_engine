import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import seaborn as sns
import matplotlib.pyplot as plt

def train():
    print("🚀 Loading Data...")
    X_train = np.load('data/processed/X_train.npy')
    y_train = np.load('data/processed/y_train.npy')
    X_test = np.load('data/processed/X_test.npy')
    y_test = np.load('data/processed/y_test.npy')

    print(f"Data Loaded. Training on {len(X_train)} samples...")

    # 1. Initialize the Model
    # n_estimators=100: Create 100 decision trees (the "Forest")
    # random_state=42: Ensures we get the same result every time
    model = RandomForestClassifier(n_estimators=100, random_state=42)

    # 2. Train the Model (Fit)
    model.fit(X_train, y_train)
    print("✅ Model Trained!")

    # 3. Evaluate
    print("\n--- Model Performance ---")
    y_pred = model.predict(X_test)

    # Accuracy is easy, but F1-Score is what matters for Churn
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    # 4. Save the Model
    joblib.dump(model, 'models/churn_model.pkl')
    print("💾 Model saved to models/churn_model.pkl")

if __name__ == "__main__":
    train()