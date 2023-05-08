from os.path import join

import numpy as np
import pandas as pd
import spacy
from loguru import logger

nlp = spacy.load("de_core_news_sm")
import de_core_news_sm

from backend.src import ROOT_DIR

path_stopwords = join(ROOT_DIR, 'data', 'stopwords_SR_no_numbers.xlsx')
stopwords = pd.read_excel(join(path_stopwords))

nlp = de_core_news_sm.load()


def normalize(x):
    if isinstance(x, str):
        doc = nlp(x)
        if len(doc) == 1:
            return doc[0].lemma_.lower()
        else:
            logger.warning(f'Word {x} results in a list {[x.lemma_ for x in doc]}')
            return x
    else:
        return None


stopwords_normalized = stopwords.applymap(normalize)
stopwords_normalized.to_pickle(path_stopwords.replace('.xlsx', '_normalized.pkl'))
