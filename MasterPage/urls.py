from django.contrib import admin
from django.urls import path
from MasterPage.views import MasterPage,HomePage

app_name = 'masters'
urlpatterns = [
    path('MasterIndex', MasterPage, name="Master"),
    path('', HomePage, name="Home"),

]
