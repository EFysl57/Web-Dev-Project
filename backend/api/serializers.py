from rest_framework import serializers
from .models import Product, Category, CartItem

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()

class SimpleProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = '__all__'