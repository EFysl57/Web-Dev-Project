from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)

class Category(models.Model):
    name = models.CharField(max_length=100)
    

class Product(models.Model):
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=500, default="")
    price = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)



class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cost = models.FloatField(default=0)
    

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)