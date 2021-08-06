from django.http.response import JsonResponse
from django.shortcuts import render
import pickle
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from pymongo import MongoClient
from dotenv import load_dotenv
import requests
import os
load_dotenv()
token = os.getenv("TIINGO")
# Create your views here.

## initial loading
client = MongoClient("localhost",27017)
db = client["project_strategy"]
table = db["application_stock_categories"]
data = table.find(show_record_id=False)
categories =  pd.DataFrame(list(data))
table = db["models"]
data = table.find(show_record_id=False)
models =  pd.DataFrame(list(data))
client.close()
models["model"] = [pickle.loads(x) for x in models["model"]]
quarter = datetime.now().month // 3 + 1
year = datetime.now().year

@csrf_exempt
def backendView(request):
    data = json.loads(request.body.decode("utf-8"))
    try:
        ticker = data["ticker"]
        ticker_category = categories[(categories["ticker"]==ticker) & (categories["year"] == year) & (categories["quarter"]==quarter)]
        number_of_training_weeks = 14
        start = (datetime.now() - timedelta(days=(number_of_training_weeks + 1)*7)).strftime("%Y-%m-%d")
        end = datetime.now().strftime("%Y-%m-%d")
        model = models[models["category"]==ticker_category["prediction"].item()].tail(1)
        headers = {
            "Content-Type":"application/json"
        }

        params = {
            "token":token,
            "startDate":start,
            "endDate":end
        }
        url = f"https://api.tiingo.com/tiingo/daily/{ticker}/prices"
        requestResponse = requests.get(url,headers=headers,params=params)
        ticker_data =  pd.DataFrame(requestResponse.json())
    except Exception as e:
        complete = {"ticker":"getrekt","prediction":0,"adjClose":0,"score":0,"delta":0}
    try:
        ticker_data["date"] = pd.to_datetime(ticker_data["date"])
        ticker_data["year"] = [x.year for x in ticker_data["date"]]
        ticker_data["quarter"] = [x.quarter for x in ticker_data["date"]]
        ticker_data["week"] = [x.week for x in ticker_data["date"]]
        weekly = ticker_data.groupby(["year","quarter","week"]).mean().reset_index()
        for i in range(number_of_training_weeks):
            weekly[i] = weekly["adjClose"].shift(1)
        weekly["y"] = weekly["adjClose"].shift(-1)
        weekly.dropna(inplace=True)
        weekly["ticker"] = ticker
        for i in range(number_of_training_weeks):
            weekly.rename(columns={i:str(i)},inplace=True)
        X = weekly[[str(x) for x in range(number_of_training_weeks)]].tail(1)
        current = ticker_data.tail(1)["adjClose"].item()
        prediction = model["model"].item().predict(X)[0]
        score = model["score"].item()
        complete = {"ticker":ticker,"adjClose":current,"prediction":float(round(prediction,2)),"delta":float(round(((prediction-current)/current)*100,2)),"score":float(round(score*100,2))}
    except:
        complete = {"ticker":"getrekt","prediction":0,"adjClose":0,"score":0,"delta":0}
    return JsonResponse(complete,safe=False)
