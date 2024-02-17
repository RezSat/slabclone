from work import *
from flask import Flask, render_template, request
import json

app = Flask(__name__)


@app.route('/stringtoquery', methods=['POST'])
def strtoq():
    data = request.json['text']
    print(data)
    return {'query':string_to_query(data)}

@app.route('/getsolution', methods = ['GET'])
def get_solution():
    input = request.args.get('input')
    print(input)
    json_object = json.loads(symbolab(string_to_query(input)))
    return render_template('solution.html', json_data = json_object)

@app.route('/')
def home():
    return render_template('index.html')

