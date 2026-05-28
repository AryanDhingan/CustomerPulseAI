import pandas as pd


class RecommendationEngine:

    def generate_recommendations(
            self,
            data_path
    ):

        df = pd.read_csv(
            data_path
        )

        recommendations=[]


        for _,row in df.iterrows():

            recommendation=[]


            if row["IsActiveMember"]==0:

                recommendation.append(
                    "Offer engagement campaign"
                )


            if row["Balance"]>100000:

                recommendation.append(
                    "Assign relationship manager"
                )


            if row["NumOfProducts"]<=1:

                recommendation.append(
                    "Recommend additional products"
                )


            if row["Age"]>55:

                recommendation.append(
                    "Provide loyalty benefits"
                )


            if not recommendation:

                recommendation.append(
                    "No immediate action"
                )


            recommendations.append(
                ", ".join(
                    recommendation
                )
            )


        df[
            "Recommendations"
        ]=recommendations


        df.to_csv(

            "reports/customer_recommendations.csv",

            index=False

        )


        print(
            "Recommendations generated"
        )