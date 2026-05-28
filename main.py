from src.ingestion.data_ingestion import DataIngestion
from src.preprocessing.data_validation import DataValidation
from src.preprocessing.data_transformation import DataTransformation
from src.feature_engineering.feature_engineering import FeatureEngineering
from src.training.train_model import ModelTrainer
from src.explainability.explain import ModelExplainer
from src.feature_engineering.customer_segmentation import CustomerSegmentation
from src.recommendations.recommend import RecommendationEngine

if __name__=="__main__":

    ingestion=DataIngestion()

    train_path,test_path=(
        ingestion.initiate_data_ingestion()
    )


    validator=DataValidation()

    validator.validate_data(
        train_path
    )


    transformer=DataTransformation()

    X_train,X_test,y_train,y_test=(

        transformer.initiate_transformation(
            train_path,
            test_path
        )

    )

    feature_engineering = FeatureEngineering()

    X_train_balanced, y_train_balanced = (
        feature_engineering.balance_dataset(
            X_train,
            y_train
        )
    )

    print(
        "\nBalanced Train Shape:",
        X_train_balanced.shape
    )

    importance = (
        feature_engineering.get_feature_importance(
            X_train_balanced,
            y_train_balanced
        )
    )
    trainer = ModelTrainer()

    results = trainer.train_models(

        X_train_balanced,
        y_train_balanced,

        X_test,
        y_test

    )

    print("\nModel Results:\n")

    explainer = ModelExplainer()

    explainer.explain_model(
        X_train_balanced
   )
    for model,metrics in results.items():
        print(
            f"{model}: "
            f"Accuracy={metrics['Accuracy']:.4f}, "
            f"ROC_AUC={metrics['ROC_AUC']:.4f}"
        )
    print(
        "\nTrain Shape:",
        X_train.shape
    )

    print(
        "Test Shape:",
        X_test.shape
    )
    segmenter = CustomerSegmentation()

    clusters = (
        segmenter.create_segments(
            X_train_balanced
        )
    )
    recommender = RecommendationEngine()

    recommender.generate_recommendations(
        train_path
    )