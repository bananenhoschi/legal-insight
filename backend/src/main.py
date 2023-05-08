import pickle
from os.path import join
from typing import List

import numpy as np
import pandas as pd
import spacy

from backend.src.utils import Performance, Source

nlp = spacy.load("de_core_news_sm")
import de_core_news_sm

from backend.src import ROOT_DIR


def load_pipeline():
    global stopwords, unique_words, unique_words_counts, megamaster_dict

    print("Loading pipeline...")
    # read master

    with open(join(ROOT_DIR, 'data', 'MegaMasterFile_normalized_dict.pkl'), 'rb') as handle:
        megamaster_dict = pickle.load(handle)
    unique_words = [*megamaster_dict]

    # read stopwords
    path_stopwords = join(ROOT_DIR, 'data', 'stopwords_SR_no_numbers_normalized.pkl')
    stopwords = pd.read_pickle(path_stopwords)

    # normalization
    nlp = de_core_news_sm.load()
    return nlp


def count_words(x, word):
    if isinstance(x, list):
        return x.count(word)
    else:
        return 0


def analyse(text) -> List[Performance]:
    doc = nlp(text)
    text_analysed = list()
    for token in doc:
        word=token.lemma_.lower()
        text=token.text
        if np.logical_or(word in stopwords['stopwords'].values, not word.isalpha()):
            text_analysed.append(Performance(
                word=text,
                highlight=False,
                count=None,
                source=list()
            ))
            continue
        elif word in unique_words:
            performance = megamaster_dict[word]
            performance.word = text
            text_analysed.append(performance)
            continue
        else:
            text_analysed.append(Performance(
                word=text,
                highlight=True,
                count=0,
                source=list()
            ))
    return text_analysed