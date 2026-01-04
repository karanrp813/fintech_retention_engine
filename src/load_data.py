import pandas as pd
import os

def load_data():
    # Define the path securely
    file_path = os.path.join("data", "churn_data.csv")

    # Check if file exists first (Error Handling)
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return None

    # Load data
    df = pd.read_csv(file_path)
    print("✅ Data Loaded Successfully!")
    print(f"Dimensions: {df.shape[0]} rows, {df.shape[1]} columns")
    print("\nFirst 5 rows:")
    print(df.head())
    return df

if __name__ == "__main__":
    load_data()