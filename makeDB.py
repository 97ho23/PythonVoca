# import libraries

import pandas as pd
import os

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.vocadb

# set directory with yours
base_dir = 'C:/Users/YOON/Desktop/SPARTA/my_project/samples'
voca_file = 'voca_toeic.xlsx'
learning_file = 'learning_state.xlsx'
voca_dir = os.path.join(base_dir, voca_file)
learning_dir = os.path.join(base_dir, learning_file)

# read a excel file and make it as a DataFrame
voca_df = pd.read_excel(voca_dir,  # write your directory here
                        sheet_name='Sheet1',
                        header=0
                        )

learnint_df = pd.read_excel(learning_dir,  # write your directory here
                            sheet_name='Sheet1',
                            header=0
                            )

voca_dict = voca_df.to_dict('records')
learning_dict = learnint_df.to_dict('records')

db.voca.insert_many(voca_dict)
print("voca_dict to db")
db.learning.insert_many(learning_dict)
print("learning_dict to db")
