# import libraries

import numpy as np

import pandas as pd

import os

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.vocadb


# 화면전환 테스트
@app.route('/test')
def test():
    return render_template('mainpage.html')


# 메인 화면 보여주기
@app.route('/')
def show_mainpage():
    return render_template('mainpage.html')

# 화면전환 테스트
@app.route('/start')
def start_learning():
    return render_template('learning.html')


# 단어리스트 화면 보여주기
@app.route('/vocalist', methods=['GET'])
def load_vocalist_view():
    day_receive = request.args.get('day_give')
    print(day_receive)
    send_vocalist = list(db.voca.find({'day': day_receive}, {'_id': False}))
    return jsonify({'result': 'success', 'vocalist': send_vocalist})


# 데이리스트 불러오기
@app.route('/learninglist', methods=['GET'])
def view_learninglist():
    # 여길 채워나가세요!
    all_learning = list(db.learning.find({}, {'_id': False}))
    print(all_learning)
    return jsonify({'result': 'success', 'learning': all_learning})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
