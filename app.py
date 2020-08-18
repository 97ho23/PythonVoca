# import libraries

import numpy as np

import pandas as pd

import os

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbprac

# set directory with yours
base_dir = 'C:/Users/YOON/Desktop/SPARTA/my_project/samples'
excel_file = 'sales_per_region.xlsx'
excel_dir = os.path.join(base_dir, excel_file)

# read a excel file and make it as a DataFrame
df= pd.read_excel(excel_dir,  # write your directory here
                              sheet_name='Sheet1',
                              header=0,
                              # names = ['region', 'sales_representative', 'sales_amount'],
                              dtype={'region': str,
                                     'sales_representative': np.int64,
                                     'sales_amount': float},  # dictionary type
                              )

print(df)
print(df.to_dict())
voca_dict = df.to_dict('records')

print('keys**********')
print(voca_dict[0].keys())
print(voca_dict)
print(type(voca_dict[0]))
print(type(voca_dict))
#db.practice.insert(voca_dict)

