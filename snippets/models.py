from django.db import models
from django.conf import settings;
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import UserManager


# class Company(models.Model):
#      user=           models.OneToOneField(User,on_delete=models.CASCADE)
#      CompanyName=    models.CharField(max_length=100,null=False,blank=False)
#      CompanyRoot =    models.CharField(max_length=50,null=True)

class Operator(models.Model):
         CompID = models.IntegerField(null=False,default=1)
         OperatorName=models.CharField(max_length=60,default="Admin",null=False)
         location = models.CharField(max_length=800, blank=True)
         ImageUrl = models.CharField( max_length=100, null=True, blank=True)
         def __str__(self):
             return "Operator Table"
# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="UserProfile")
#     CompanyName = models.ForeignKey(Company,on_delete=models.CASCADE,default=1)
#
#     def companyname(self):
#         return self.CompanyName.CompanyName

#
# @receiver(post_save, sender=User)
# def create_user_UserProfile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
#
# @receiver(post_save, sender=User)
# def save_user_UserProfile(sender, instance, **kwargs):
#     instance.UserProfile.save()




class Post(models.Model):
    user        =models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    title       =models.CharField(max_length=120, null=True,blank=True)
    contents    =models.CharField(max_length=120, null=True,blank=True)
    timestamp   =models.DateTimeField(auto_now_add=True)
    CountryID   =models.IntegerField(null=False, default=0)
    def __str__(self):
        return "Post Table"

# class Country:
#     CountryName = models.CharField(max_length=50,null=True,blank=True)
#     CityName    = models.CharField(max_length=50,null=True,blank=True)
#
#     def __str__(self):
#         return "Country Table"



