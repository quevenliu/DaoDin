from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def api():
    data = request.get_json()
    result = group(data['data'])
    return jsonify({'data': result})

if __name__ == '__main__':
    app.run(host='', port=5000)