from django.contrib import admin
from snippets.models import Post,Operator
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.models import User

admin.site.register(Post)
admin.site.register(Operator)
# Register your models here.
#
#
# class UserProfileInline(admin.TabularInline):
#     model = UserProfile
#
#
#
#
#
# class UserAdmin(DjangoUserAdmin):
#     inlines = (UserProfileInline,)
#
# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)
