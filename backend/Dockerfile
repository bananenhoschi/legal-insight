FROM python:3.8-slim-buster

# Install the python dependencies
RUN python3 -m pip install --upgrade pip
COPY requirements.txt .
COPY constraints.txt .
RUN pip3 install -r requirements.txt -c constraints.txt
RUN python -m spacy download de_core_news_sm