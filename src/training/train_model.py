from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
import os
import joblib

from sklearn.model_selection import RandomizedSearchCV

from sklearn.metrics import (
    accuracy_score,
    roc_auc_score
)


class ModelTrainer:


    def train_models(

            self,
            X_train,
            y_train,
            X_test,
            y_test

    ):


        models = {

            "Logistic Regression": (

                LogisticRegression(),

                {

                    "C":[0.01,0.1,1,10]

                }

            ),


            "Random Forest": (

                RandomForestClassifier(
                    random_state=42
                ),

                {

                    "n_estimators":[100,200,300],

                    "max_depth":[5,10,15,None],

                    "min_samples_split":[2,5,10]

                }

            ),


            "XGBoost": (

                XGBClassifier(
                    random_state=42
                ),

                {

                    "n_estimators":[100,200],

                    "max_depth":[3,5,7],

                    "learning_rate":[0.01,0.1,0.2]

                }

            )

        }


        results={}

        best_model_name=None
        best_model_object=None
        best_score=0


        for name,(model,params) in models.items():

            print(
                f"\nTraining {name}..."
            )


            search=RandomizedSearchCV(

                estimator=model,

                param_distributions=params,

                cv=3,

                n_iter=5,

                scoring="roc_auc",

                random_state=42,

                n_jobs=-1

            )


            search.fit(
                X_train,
                y_train
            )


            best_estimator=(
                search.best_estimator_
            )


            predictions=(
                best_estimator.predict(
                    X_test
                )
            )


            probabilities=(

                best_estimator.predict_proba(
                    X_test
                )[:,1]

            )


            accuracy=accuracy_score(
                y_test,
                predictions
            )


            roc_auc=roc_auc_score(

                y_test,
                probabilities

            )


            results[name]={

                "Accuracy":accuracy,

                "ROC_AUC":roc_auc

            }


            if roc_auc>best_score:

                best_score=roc_auc

                best_model_name = name

                best_model_object = best_estimator


        os.makedirs(
            "models",
            exist_ok=True
        )

        joblib.dump(
            best_model_object,
            "models/best_model.pkl"
        )

        print(
            f"\nBest Model: {best_model_name}"
        )

        print(
            "Model saved successfully"
        )

        return results