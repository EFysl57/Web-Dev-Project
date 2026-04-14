from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product, Cart, CartItem
from .serializers import ProductSerializer, CartItemSerializer


@api_view(['POST'])
def login_view(request):
    user = authenticate(
        username=request.data['username'],
        password=request.data['password']
    )
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({'access': str(refresh.access_token)})
    return Response({'error': 'Invalid credentials'}, status=400)


class ProductList(APIView):
    def get(self, request):
        products = Product.objects.all()
        return Response(ProductSerializer(products, many=True).data)


class ProductDetail(APIView):
    def get(self, request, pk):
        product = Product.objects.get(pk=pk)
        return Response(ProductSerializer(product).data)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = CartItem.objects.filter(cart=cart)
        return Response(CartItemSerializer(items, many=True).data)


class AddToCart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
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
        item.delete()
        return Response({'status': 'deleted'})