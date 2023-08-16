from flask import Flask, request, jsonify
from group import group
from transformers import BertModel, BertTokenizer

app = Flask(__name__)


model_name = 'bert-base-chinese'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)

@app.route('/', methods=['POST'])
def api():
    data = request.get_json()
    result = group(data['data'], tokenizer, model)
    return jsonify({'data': result})

if __name__ == '__main__':
    app.run(host='', port=5000)