from django.contrib import admin
from django.urls import path
from groups.views import Groups,GroupPage,GroupBy

app_name = 'groups'
urlpatterns = [
    path('',GroupPage),
    path('GroupsAPI',Groups),
    path('GroupBy',GroupBy)
]

