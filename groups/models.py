from django.db import models

class Group(models.Model):
    countryName= models.CharField( max_length=50,null=False)
    AirPort    = models.CharField( max_length=50,null=False)
    FlightDate = models.DateField(null=False)
    NoOfSeats  = models.IntegerField(null=False)
    HotelName  = models.CharField( max_length=50, null=False)
    ADTPrice   = models.DecimalField(max_digits=10,decimal_places=2, null=False)
    CHDPrice   = models.DecimalField(max_digits=10,decimal_places=2, null=False)
    InfPrice   = models.DecimalField(max_digits=10,decimal_places=2, null=False)
    SingleDiff = models.DecimalField(max_digits=10,decimal_places=2, null=False)
    Days       = models.IntegerField(null=False)
    FlightName = models.CharField(max_length=150,null=False)
    HotelUrl   = models.CharField( max_length=1000, null=True)

class GroupProgram(models.Model):
    groupID=models.IntegerField(null=False)
    titleProgtxt=models.CharField(max_length=50,null=False, default="اليوم الاول")
    ProgramText=models.CharField(max_length=1500, null=False)
