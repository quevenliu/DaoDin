from transformers import AutoTokenizer, AutoModel
    
# Get the embedding of self introduction and match message
def get_embedding(text):
    tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/bert-base-nli-mean-tokens")
    model = AutoModel.from_pretrained("sentence-transformers/bert-base-nli-mean-tokens")
    input_ids = tokenizer.encode(text, return_tensors='pt')
    output = model(input_ids)
    embedding = output[0][0][0].detach().numpy()
    return embedding