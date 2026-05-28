import os
import pandas as pd

from dataclasses import dataclass
from sklearn.model_selection import train_test_split


@dataclass
class DataIngestionConfig:

    train_data_path = "data/processed/train.csv"
    test_data_path = "data/processed/test.csv"


class DataIngestion:

    def __init__(self):

        self.ingestion_config = DataIngestionConfig()


    def initiate_data_ingestion(self):

        try:

            print("Reading dataset...")

            df = pd.read_csv(
                "data/raw/churn.csv"
            )

            print(
                f"Dataset Loaded: {df.shape}"
            )


            os.makedirs(
                os.path.dirname(
                    self.ingestion_config.train_data_path
                ),
                exist_ok=True
            )


            train_set,test_set = train_test_split(

                df,

                test_size=0.20,
                random_state=42,

                stratify=df["Exited"]

            )


            train_set.to_csv(

                self.ingestion_config.train_data_path,
                index=False

            )


            test_set.to_csv(

                self.ingestion_config.test_data_path,
                index=False

            )


            print("Train-Test Split Completed")

            print(
                f"Train Shape:{train_set.shape}"
            )

            print(
                f"Test Shape:{test_set.shape}"
            )


            return (

                self.ingestion_config.train_data_path,
                self.ingestion_config.test_data_path

            )


        except Exception as e:

            raise Exception(e)