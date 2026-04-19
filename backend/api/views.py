from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Cart, CartItem, User
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework import status
@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    user = serializer.validated_data['user']
    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),  
    }, status=status.HTTP_200_OK)

class ProductList(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        products = Product.objects.all()
        return Response(ProductSerializer(products, many=True).data)


class ProductDetail(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        product = Product.objects.get(pk=pk)
        return Response(ProductSerializer(product).data)


class CartView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.user)
        print(request.user.is_authenticated)
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = CartItem.objects.filter(cart=cart)
        total_cost =  sum(item.product.price * item.quantity for item in items)

        return Response({
            "items": CartItemSerializer(items, many=True).data,
            "total": total_cost
        })

@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)

    product_id = request.data.get('product_id')
    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product_id=product_id
    )

    if not created:
        item.quantity += 1
        item.save()

    return Response({'status': 'added'})





class RemoveFromCart(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        item = CartItem.objects.get(pk=pk)
        if(item):
            if(item.quantity > 1):
                item.quantity -= 1
                item.save()
            elif(item.quantity == 1):
                item.delete()
        return Response({'status': 'deleted'})
    
class UserProfile(APIView):

    def get(self, request):
        user = request.user
        profile = UserSerializer(user)
        return Response(profile.data)