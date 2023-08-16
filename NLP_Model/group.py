import numpy as np
from sklearn.cluster import KMeans
from embedder import get_embedding

def group(data):
    user_ids = []
    embeddings = []
    for user in data:
        user_ids.append(user['user_id'])
        embeddings.append(get_embedding(user['self_intro'] + user['match_msg']))
    embeddings = np.array(embeddings)
    kmeans = KMeans(n_clusters=5, random_state=0).fit(embeddings)
    result = []
    for i in range(5):
        result.append([])
    for i in range(len(user_ids)):
        result[kmeans.labels_[i]].append(user_ids[i])
    return result