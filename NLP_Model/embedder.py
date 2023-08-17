import torch

def get_embedding(text, tokenizer, model):
    with torch.no_grad():
        input_ids = tokenizer.encode(text, add_special_tokens=True)
        input_ids = torch.tensor([input_ids])
        last_hidden_states = model(input_ids)[0]
        sentence_vector = torch.mean(last_hidden_states[0], dim=0)
        vector = sentence_vector.numpy()
    return vector

   