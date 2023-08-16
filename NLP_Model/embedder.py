import torch
from transformers import BertModel, BertTokenizer
import numpy as np   
from sklearn.preprocessing import QuantileTransformer
# Get the embedding of self introduction and match message

model_name = 'bert-base-chinese'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)
def get_embedding(text):
    with torch.no_grad():
        input_ids = tokenizer.encode(text, add_special_tokens=True)
        input_ids = torch.tensor([input_ids])
        last_hidden_states = model(input_ids)[0]
        sentence_vector = torch.mean(last_hidden_states[0], dim=0)
        vector = sentence_vector.numpy()
    return vector

   