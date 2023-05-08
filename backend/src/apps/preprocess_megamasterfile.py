import pickle
from os.path import join

import numpy as np
import pandas as pd
import spacy
from tqdm import tqdm

from backend.src.utils import Performance, Source

nlp = spacy.load("de_core_news_sm")
import de_core_news_sm

from backend.src import ROOT_DIR

path_master = join(ROOT_DIR, 'data', 'MegaMasterFile.pkl')
data = pd.read_pickle(join(path_master))
data.set_index(keys=['ID', 'SR Nr','Art Nr', 'Abs Nr'], inplace=True)

path_stopwords = join(ROOT_DIR, 'data', 'stopwords_SR_no_numbers.xlsx')
stopwords = pd.read_excel(join(path_stopwords))

nlp = de_core_news_sm.load()


def normalize(x):
    if isinstance(x, str):
        doc = nlp(x)
        return [x.lemma_.lower() for x in doc if not np.logical_or(x.is_punct, x.lemma_.lower() in stopwords['stopwords'].values)]
    else:
        return []


data_normalized = data.applymap(normalize)

unique_words, unique_words_counts = np.unique(np.concatenate(np.concatenate(data_normalized.to_numpy())), return_counts=True)
unique_words_alpha = [x for x in unique_words if x.isalpha()]
columns=data_normalized.columns.values

unique_words_alpha_dict = dict()
for word in unique_words_alpha:
    unique_words_alpha_dict[word] = Performance(
        word=word,
        highlight=True,
        count=0,
        source=list(),
    )

for row in tqdm(data_normalized.itertuples(), total=data_normalized.shape[0]):
    sr_number = row.Index[1]
    art_number = row.Index[2]
    abs_number = row.Index[3]
    for col in columns:
        all_words = getattr(row, col)
        unique_words_in_cell = np.unique(all_words)
        for word in unique_words_in_cell:
            if word in unique_words_alpha:
                unique_words_alpha_dict[word].source.append(Source(
                    sr_number=sr_number,
                    art_number=art_number,
                    abs_nr=abs_number,
                    ziff=col,
                    number=len(np.where(np.asarray(all_words) == word)[0])
                ))

unique_words = [*unique_words_alpha_dict]
for word in unique_words:
    sources = unique_words_alpha_dict[word].source
    unique_words_alpha_dict[word].count = np.sum([x.number for x in sources])


with open(join(ROOT_DIR, 'data', 'MegaMasterFile_normalized_dict.pkl'), 'wb') as handle:
    pickle.dump(unique_words_alpha_dict, handle, protocol=pickle.HIGHEST_PROTOCOL)


print('')
