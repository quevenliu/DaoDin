import numpy as np
from k_means_constrained import KMeansConstrained
from embedder import get_embedding
import time

def group(data):
    SIZE_MIN = 4
    SIZE_MAX = 5
    N_CLUSTERS=np.ceil(len(data)/SIZE_MAX).astype(int)
    user_ids = []
    embeddings = []
    for user in data:
        user_ids.append(user['user_id'])
        embeddings.append(get_embedding(user['self_intro'] + '\n' + user['match_msg']))
    embeddings = np.array(embeddings)
    kmeans = KMeansConstrained(n_clusters=N_CLUSTERS, 
                               size_min=SIZE_MIN,
                               size_max=SIZE_MAX).fit(embeddings)
    result = []
    for i in range(N_CLUSTERS):
        result.append([])
    for i in range(len(user_ids)):
        result[kmeans.labels_[i]].append(user_ids[i])
    return result