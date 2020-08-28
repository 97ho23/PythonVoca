# import libraries

import numpy as np

import pandas as pd

import os

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.vocadb
chosen_day = ""


# 화면전환 테스트
@app.route('/test')
def test():
    return render_template('mainpage.html')


# 메인 화면 보여주기
@app.route('/')
def show_mainpage():
    # 데이값이 저장 될 전역변수 초기화
    global chosen_day
    chosen_day = ""
    return render_template('mainpage.html')


# 화면전환 테스트
@app.route('/start')
def show_learningpage():
    return render_template('learning.html')


# 데이리스트 불러오기
@app.route('/learninglist', methods=['GET'])
def load_learninglist():
    all_learning = list(db.learning.find({}, {'_id': False}))
    print(all_learning)
    return jsonify({'result': 'success', 'learning': all_learning})


# 선택한 데이값 받아오기, 단어리스트 페이지 출력
@app.route('/day_choose', methods=['GET'])
def show_vocalistpage():
    day_receive = request.args.get('day_give')
    print("day_receive = " + day_receive)
    global chosen_day
    chosen_day = day_receive
    # send_vocalist = list(db.voca.find({'day': day_receive}, {'_id': False}))
    # return jsonify({'result': 'success', 'vocalist': send_vocalist})
    return render_template('vocalist.html')


# 데이 값에 대한 단어리스트 불러오기
@app.route('/vocalist', methods=['GET'])
def load_vocalist_view():
    global chosen_day
    print("chosen_day = " + chosen_day)
    send_vocalist = list(db.voca.find({'day': chosen_day}, {'_id': False}))
    return jsonify({'result': 'success', 'vocalist': send_vocalist, 'chosen_day': chosen_day})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
