from flask import Flask, request, jsonify
from group import group

app = Flask(__name__)
model = "text-embedding-ada-002"

@app.route('/', methods=['POST'])
def api():
    data = request.get_json()
    result = group(data['data'], model)
    return jsonify({'data': result})


if __name__ == '__main__':
    app.run(host='', port=5000)
