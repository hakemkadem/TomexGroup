from django.contrib import admin
from django.urls import path,include
from django.contrib.auth.views import login
from django.contrib.auth import views
from snippets.views import TestFromHomeIndex,PostList
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth import views as auth_views
from snippets.views import user_login
urlpatterns = [
    path('admin/', admin.site.urls),
    path('snippets/',include('snippets.urls')),
    path('Master/',include('MasterPage.urls')),
    path('groups/',include('groups.urls')),
    path('TestIndex',TestFromHomeIndex,name="MainTest"),
    path('Post',PostList),
    path('accounts/',include('django.contrib.auth.urls')),
    path('', user_login, name="userlogin"),
    #path('',auth_views.login)
]


