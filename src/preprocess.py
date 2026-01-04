import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
import os

# 1. Load Data (Reusing our cleaner function logic)
def load_data():
    df = pd.read_csv("data/churn_data.csv")
    # Drop irrelevant columns
    df = df.drop(['RowNumber', 'CustomerId', 'Surname'], axis=1)
    return df

def run_preprocessing():
    print("🚀 Starting Preprocessing...")
    df = load_data()

    # 2. Define Features (X) and Target (y)
    X = df.drop('Exited', axis=1)
    y = df['Exited']

    # 3. Split into Train and Test sets
    # Stratify=y ensures we keep the same ratio of Churners in both sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 4. Define our column types
    numeric_features = ['CreditScore', 'Age', 'Tenure', 'Balance', 'NumOfProducts', 'EstimatedSalary']
    categorical_features = ['Geography', 'Gender']

    # 5. Build the Transformer Pipeline
    # This automates the "Math" conversion
    preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(drop='first'), categorical_features)
    ],
    remainder='passthrough'  # <--- THIS LINE SAVES THE OTHER COLUMNS
)
    # 6. Fit the preprocessor ONLY on Training data
    # (We never look at Test data during training - that's cheating!)
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)

    # 7. Save the processed data and the engine itself
    # We save 'preprocessor.pkl' so our future API can use it to translate new users
    if not os.path.exists('data/processed'):
        os.makedirs('data/processed')
    if not os.path.exists('models'):
        os.makedirs('models')

    # Save arrays
    np.save('data/processed/X_train.npy', X_train_processed)
    np.save('data/processed/X_test.npy', X_test_processed)
    np.save('data/processed/y_train.npy', y_train)
    np.save('data/processed/y_test.npy', y_test)

    # Save the engine
    joblib.dump(preprocessor, 'models/preprocessor.pkl')

    print(f"✅ Data processed!")
    print(f"Training shape: {X_train_processed.shape}")
    print(f"Testing shape: {X_test_processed.shape}")
    print(f"Preprocessor saved to models/preprocessor.pkl")

if __name__ == "__main__":
    run_preprocessing()