from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import os


class CustomerSegmentation:

    def create_segments(
            self,
            X_train
    ):

        print(
            "\nCreating customer segments..."
        )

        kmeans = KMeans(
            n_clusters=4,
            random_state=42,
            n_init=10
        )

        clusters = kmeans.fit_predict(
            X_train
        )


        pca = PCA(
            n_components=2
        )

        reduced = pca.fit_transform(
            X_train
        )


        os.makedirs(
            "reports",
            exist_ok=True
        )


        plt.figure(
            figsize=(8,6)
        )

        plt.scatter(
            reduced[:,0],
            reduced[:,1],
            c=clusters
        )

        plt.title(
            "Customer Segments"
        )

        plt.savefig(
            "reports/customer_segments.png"
        )

        plt.close()


        print(
            "Segmentation report generated"
        )

        return clusters