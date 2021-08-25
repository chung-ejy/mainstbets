from django.http.response import JsonResponse
from django.shortcuts import render
import pickle
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from pymongo import MongoClient
# Create your views here.

## initial loading
client = MongoClient("localhost",27017)
db = client["mainstbets"]
table = db["recent"]
data = table.find(show_record_id=False)
ts = pd.DataFrame(list(data)).drop("_id",axis=1)[["date","ticker","adjClose","rolling","gain"]]

table = db["sp500"]
data = table.find(show_record_id=False)
sector_list = pd.DataFrame(list(data)).drop("_id",axis=1)[["Symbol","Security","GICS Sector"]]
client.close()

@csrf_exempt
def timeseries(request):
    complete = {}
    complete["table"] = list(ts.to_dict("records"))
    return JsonResponse(complete,safe=False)

@csrf_exempt
def sectors(request):
    complete = {}
    print(sector_list.columns)
    complete["sectors"] = list(sector_list.to_dict("records"))
    return JsonResponse(complete,safe=False)

@csrf_exempt
def stock(request):
    data = json.loads(request.body.decode("utf-8"))
    try:
        ticker = data["ticker"]
        db = client["mainstbets"]
        table = db["full"]
        data = table.find({"ticker":ticker},show_record_id=False)
        ticker_data = pd.DataFrame(list(data)).drop("_id",axis=1)
        complete = {}
        complete["ticker_data"] = list(ticker_data.to_dict("records"))
    except Exception as e:
        print(str(e))
        complete = {"ticker_data":[]}
    return JsonResponse(complete,safe=False)
