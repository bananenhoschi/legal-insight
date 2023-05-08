"""
Instantiate the Flask app and define its endpoints
"""
import pandas as pd
from flask import jsonify, make_response, Response, request
import dataclasses
import json
from backend.src.main import load_pipeline, analyse
from backend.src.web_app import app

def create_app():
    # Instantiate the pipeline
    nlp = load_pipeline()
    nlp("Load resources")

    @app.route('/')
    def health():
        return 'OK', 200

    @app.route('/api/analyse', methods=['POST'])
    def analyse_endpoint():
        res = analyse(request.get_json(force=False, silent=False)['text'])

        results = pd.DataFrame.from_records([hospital.__dict__ for hospital in res], index=range(len(res)))
        return Response(results.to_json(orient='records'), mimetype='application/json')


    return app


api = create_app()

# Run the app
if __name__ == '__main__':
    api.run(host='0.0.0.0')
