def get_embedding(text):
    input_ids = tokenizer.encode(text, return_tensors='pt')
    output = model(input_ids)
    embedding = output[0][0][0].detach().numpy()
    return embedding