from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_view),

    path('products/', ProductList.as_view()),
    path('products/<int:pk>/', ProductDetail.as_view()),

    path('cart/', CartView.as_view()),
    path('cart/add/', AddToCart.as_view()),
    path('cart/remove/<int:pk>/', RemoveFromCart.as_view()),
]