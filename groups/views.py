from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from groups.models import Group
from django.http import HttpRequest, JsonResponse,HttpResponse
from django.core import serializers
@csrf_exempt
def GroupPage(request):
    return  render(request,'groups/Groups.html')

@csrf_exempt
def Groups(request):
        Data = []
        obj  = {}
        query = Group.objects.all()
        # for i in query:
        #     obj={"airport":i.AirPort, "countray":i.countryName}
        #     Data.append(obj)

        return HttpResponse(serializers.serialize("json", query),
                                  content_type='application/json')

        # return JsonResponse({"res":Data})