import os
import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

from sklearn.impute import SimpleImputer
from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder
)


class DataTransformation:

    def get_preprocessor(self):

        numerical_columns = [

            "CreditScore",
            "Age",
            "Tenure",
            "Balance",
            "NumOfProducts",
            "HasCrCard",
            "IsActiveMember",
            "EstimatedSalary"

        ]

        categorical_columns = [

            "Geography",
            "Gender"

        ]


        numerical_pipeline = Pipeline(

            steps=[

                (
                    "imputer",
                    SimpleImputer(
                        strategy="median"
                    )
                ),

                (
                    "scaler",
                    StandardScaler()
                )

            ]
        )


        categorical_pipeline = Pipeline(

            steps=[

                (
                    "imputer",
                    SimpleImputer(
                        strategy="most_frequent"
                    )
                ),

                (
                    "encoder",
                    OneHotEncoder(
                        handle_unknown="ignore"
                    )
                )

            ]
        )


        preprocessor = ColumnTransformer(

            [

                (
                    "numerical",
                    numerical_pipeline,
                    numerical_columns
                ),

                (
                    "categorical",
                    categorical_pipeline,
                    categorical_columns
                )

            ]
        )


        return preprocessor


    def initiate_transformation(
            self,
            train_path,
            test_path
    ):

        train_df = pd.read_csv(
            train_path
        )

        test_df = pd.read_csv(
            test_path
        )


        target_column = "Exited"

        X_train = train_df.drop(
            columns=[
                target_column,
                "RowNumber",
                "CustomerId",
                "Surname"
            ],
            errors="ignore"
        )

        y_train = train_df[
            target_column
        ]

        X_test = test_df.drop(
            columns=[
                target_column,
                "RowNumber",
                "CustomerId",
                "Surname"
            ],
            errors="ignore"
        )

        y_test = test_df[
            target_column
        ]


        preprocessing_obj = (
            self.get_preprocessor()
        )


        X_train_processed = (
            preprocessing_obj.fit_transform(
                X_train
            )
        )

        X_test_processed = (
            preprocessing_obj.transform(
                X_test
            )
        )


        os.makedirs(
            "artifacts",
            exist_ok=True
        )


        joblib.dump(

            preprocessing_obj,

            "artifacts/preprocessor.pkl"

        )


        return (

            X_train_processed,
            X_test_processed,
            y_train,
            y_test
        )