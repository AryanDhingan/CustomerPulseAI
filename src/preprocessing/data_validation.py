import pandas as pd

from src.utils.logger import logging


class DataValidation:

    def validate_data(self, path):

        try:

            logging.info(
                "Reading dataset"
            )

            df = pd.read_csv(path)

            logging.info(
                "Checking missing values"
            )

            missing = df.isnull().sum()

            print("\nMissing Values:\n")
            print(
                missing[missing>0]
            )


            logging.info(
                "Checking duplicates"
            )

            duplicate_count = (
                df.duplicated().sum()
            )

            print(
                f"\nDuplicates: {duplicate_count}"
            )


            logging.info(
                "Checking data types"
            )

            print(
                "\nData Types:\n"
            )

            print(
                df.dtypes
            )


            logging.info(
                "Validation Completed"
            )


        except Exception as e:

            logging.info(
                f"Error:{e}"
            )

            raise Exception(e)