from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier
import pandas as pd


class FeatureEngineering:


    def balance_dataset(
            self,
            X_train,
            y_train
    ):

        print("\nBefore SMOTE:")

        print(
            y_train.value_counts()
        )


        smote = SMOTE(
            random_state=42
        )


        X_train_balanced, y_train_balanced=(

            smote.fit_resample(
                X_train,
                y_train
            )

        )


        print("\nAfter SMOTE:")

        print(
            y_train_balanced.value_counts()
        )


        return (

            X_train_balanced,
            y_train_balanced

        )


    def get_feature_importance(

            self,
            X_train,
            y_train

    ):

        model = RandomForestClassifier(
            random_state=42
        )


        model.fit(
            X_train,
            y_train
        )


        importance = pd.DataFrame(

            {

                "Feature":

                range(
                    X_train.shape[1]
                ),

                "Importance":

                model.feature_importances_

            }

        )


        importance = importance.sort_values(

            by="Importance",
            ascending=False

        )


        print(
            "\nFeature Importance:\n"
        )

        print(
            importance.head(10)
        )


        return importance