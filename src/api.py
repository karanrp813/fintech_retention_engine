from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. Initialize App
app = FastAPI(title="Customer Retention Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, change to ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load Models with Error Checking
try:
    model = joblib.load('models/churn_model.pkl')
    preprocessor = joblib.load('models/preprocessor.pkl')
    print("✅ Models loaded successfully!")
except Exception as e:
    print(f"❌ FATAL ERROR loading models: {e}")
    sys.exit(1)

# 3. Define Data Schema
class CustomerData(BaseModel):
    CreditScore: int
    Geography: str
    Gender: str
    Age: int
    Tenure: int
    Balance: float
    NumOfProducts: int
    HasCrCard: int
    IsActiveMember: int
    EstimatedSalary: float

@app.post("/predict")
def predict_churn(data: CustomerData):
    print("🔹 Received Data request...") # Debug print
    
    try:
        # Convert incoming JSON to DataFrame
        # Safe way to handle Pydantic v1 vs v2
        input_data = pd.DataFrame([data.model_dump()])
        print(f"🔹 DataFrame created. Shape: {input_data.shape}")
        
        # Preprocess
        print("🔹 Processing data...")
        processed_data = preprocessor.transform(input_data)
        print(f"🔹 Data Processed. Shape: {processed_data.shape}")
        
        # Predict
        prediction = model.predict(processed_data)
        probability = model.predict_proba(processed_data)
        
        result = "Churn" if prediction[0] == 1 else "No Churn"
        print(f"✅ Prediction Success: {result}")
        
        return {
            "prediction": result,
            "probability": round(float(probability[0][1]), 2)
        }

    except Exception as e:
        # This catches the error and sends it back to you
        print(f"❌ ERROR inside /predict: {str(e)}")
        return {"error": f"Internal Server Error: {str(e)}"}