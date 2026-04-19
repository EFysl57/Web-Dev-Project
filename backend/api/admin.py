from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
# Register your models here.


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Extra fields", {"fields": ("phone", "city")}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Extra fields", {"fields": ("phone", "city")}),
    )






admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(User, CustomUserAdmin)