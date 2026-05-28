import os
import joblib
import shap
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


class ModelExplainer:

    def explain_model(
            self,
            X_train
    ):

        print("\nLoading model...")

        model = joblib.load(
            "models/best_model.pkl"
        )

        print("Generating SHAP values...")


        # convert to dataframe if numpy array
        if not isinstance(
            X_train,
            pd.DataFrame
        ):

            X_train = pd.DataFrame(
                X_train
            )


        # use a sample to speed up explanation
        sample = X_train.sample(
            n=min(500, len(X_train)),
            random_state=42
        )


        explainer = shap.Explainer(
            model.predict,
            sample
        )


        shap_values = explainer(
            sample
        )


        os.makedirs(
            "reports",
            exist_ok=True
        )


        plt.figure()

        shap.plots.beeswarm(
            shap_values,
            show=False
        )

        plt.savefig(
            "reports/shap_summary.png",
            bbox_inches="tight"
        )

        plt.close()


        print(
            "SHAP report generated successfully"
        )