from django.shortcuts import render
from snippets.views import PostList
from snippets.models import Post
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.utils import timezone
# Create your views here.

def MasterPage(request):
    active_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    user_id_list = []
    for session in active_sessions:
        data = session.get_decoded()
        user_id_list.append(data.get('_auth_user_id', None))
    # Query all logged in users based on id list
    result=User.objects.filter(id__in=user_id_list)
    return  render(request,'MasterPage/MasterIndex.html',context=result);


def HomePage (request):
    return render(request,'MasterPage/HomePage.html');



def get_current_users():
    active_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    user_id_list = []
    for session in active_sessions:
        data = session.get_decoded()
        user_id_list.append(data.get('_auth_user_id', None))
    # Query all logged in users based on id list
    return User.objects.filter(id__in=user_id_list)
