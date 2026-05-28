from fastapi import FastAPI
import joblib
import pandas as pd

from api.schemas import CustomerData
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CustomerPulse AI API"
)

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

model = joblib.load(
    "models/best_model.pkl"
)

preprocessor = joblib.load(
    "artifacts/preprocessor.pkl"
)


@app.get("/")
def home():

    return {

        "message":
        "CustomerPulse AI API Running"

    }


@app.post("/predict")
def predict(data: CustomerData):

    input_df = pd.DataFrame(
        [data.dict()]
    )


    processed_data = (
        preprocessor.transform(
            input_df
        )
    )


    prediction = model.predict(
        processed_data
    )[0]


    probability = model.predict_proba(
        processed_data
    )[0][1]


    risk_level = "Low"


    if probability > 0.75:

        risk_level = "High"

    elif probability > 0.40:

        risk_level = "Medium"


    recommendations = []


    if data.IsActiveMember == 0:

        recommendations.append(
            "Offer engagement campaign"
        )


    if data.Balance > 100000:

        recommendations.append(
            "Assign relationship manager"
        )


    if data.NumOfProducts <= 1:

        recommendations.append(
            "Recommend additional banking products"
        )


    if probability > 0.75:

        recommendations.append(
            "Offer retention discount"
        )


    result = {

        "prediction":

        "Churn" if prediction == 1
        else "No Churn",


        "churn_probability":

        round(
            float(probability),
            4
        ),


        "risk_level":
        risk_level,


        "recommended_actions":
        recommendations

    }


    return result