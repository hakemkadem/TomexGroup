from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from groups.models import Group,GroupProgram
from django.http import HttpRequest, JsonResponse,HttpResponse
from django.core import serializers
from django.db.models import Count
@csrf_exempt
def GroupPage(request):
    return  render(request,'groups/Groups.html')

@csrf_exempt
def Groups(request):
        Data = []
        obj  = {}
        program=[]
        proObj={}
        query = Group.objects.all()

        for i in query:
            QueryProgram = GroupProgram.objects.filter(groupID=i.id);
            program = []
            for j in QueryProgram:
                proObj={"titleProgtxt":j.titleProgtxt,"prog":j.ProgramText}
                program.append(proObj)
            obj={
                "countryName":i.countryName,
                "AirPort":i.AirPort,
                "FlightDate":i.FlightDate,
                "NoOfSeats":i.NoOfSeats,
                "HotelName":i.HotelName,
                "ADTPrice":i.ADTPrice,
                "CHDPrice":i.CHDPrice,
                "InfPrice":i.InfPrice,
                "Days":i.Days,
                "SingleDiff":i.SingleDiff,
                "FlightName":i.FlightName,
                "HotelUrl": i.HotelUrl,
                "program":program}

            Data.append(obj)

           # return HttpResponse(serializers.serialize("json", Data),
           #                         content_type='application/json')
        return JsonResponse({"res":Data})

@csrf_exempt
def GroupBy(request):
    qs = Group.objects.values('countryName').annotate( Gcount=Count('countryName'))

    MainDetails=[];
    MainObj={};
    GroupDetails = [];
    SubObj={};
    program=[];

    for i in qs:

        Subqs=Group.objects.filter(countryName=i['countryName']);
        GroupDetails=[]
        for j in Subqs:
            QueryProgram = GroupProgram.objects.filter(groupID=j.id);
            program = []
            for dd in QueryProgram:
                proObj = {"titleProgtxt": dd.titleProgtxt, "prog": dd.ProgramText}
                program.append(proObj)
            SubObj={
                    "countryName":j.countryName,
                    "AirPort":j.AirPort,
                    "FlightDate":j.FlightDate,
                    "NoOfSeats":j.NoOfSeats,
                    "HotelName":j.HotelName,
                    "ADTPrice":j.ADTPrice,
                    "CHDPrice":j.CHDPrice,
                    "InfPrice":j.InfPrice,
                    "Days":j.Days,
                    "SingleDiff":j.SingleDiff,
                    "FlightName":j.FlightName,
                    "HotelUrl": j.HotelUrl,
                    "program":program}
            GroupDetails.append(SubObj)
        MainObj = {"countryName": i['countryName'], 'GroupDetails':GroupDetails,  'Gcount': i['Gcount']}
        MainDetails.append(MainObj)

    return JsonResponse({"res": MainDetails})