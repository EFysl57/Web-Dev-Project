from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(100)
    

class Product(models.Model):
    name = models.CharField(100)
    price = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)



class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cost = models.FloatField()
    

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)