"""
first_names wordlists
"""

import os
import csv
import json

from .. import word_list_counter

NAME = 'first_names'

raw_first_names_1_path = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    'raw',
    'DutchFirstNames',
    'name_popularity_netherlands_1880-2014.csv'
)
raw_first_names_2_path = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    'raw',
    'DutchNameGenerator',
    'MarkovDutchNameGenerator',
    'FirstNames.txt'
)
raw_first_names_3_path = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    'raw',
    'name-dataset',
    'names_dataset',
    'first_names.all.txt'
)
raw_first_names_4_path = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    'raw',
    'voornamen',
    'voornamen.json'
)

def get_wordlists(line_printer_cb):
    word_list = word_list_counter.WordListCounter()
    def add_and_print(word):
        word_list.check_and_add(word)
        line_printer_cb('main: {}'.format(word_list.count))

    with open(raw_first_names_1_path) as csvfile:
        data = list(csv.DictReader(csvfile, delimiter=','))
        for row in data:
            add_and_print(row['naam'])
    for path in [raw_first_names_2_path, raw_first_names_3_path]:
        with open(path) as f:
            data = f.readlines()
            for row in data:
                add_and_print(row)
    with open(raw_first_names_4_path) as f:
        data = json.load(f)
        for row in data:
            add_and_print(row['naam'])
    return {'main': word_list.all}