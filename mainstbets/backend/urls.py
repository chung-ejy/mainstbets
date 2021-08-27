from . import views
from django.urls import path
urlpatterns = [
    path("timeseries",views.timeseries,name="api"),
    path("sectors",views.sectors,name="api"),
    path("stock",views.stock,name="api"),
    path("sector",views.sector,name="api"),
]