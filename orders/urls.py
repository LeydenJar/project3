from django.urls import path, include
from orders.views import index, validate, getData, orders, getOrders, putOrder, removeItem, staffPage, getOrdersStaff, deleteOrder
from users.views import register
from django.contrib.auth import views as auth_views




urlpatterns = [
    path("", index, name="index"),
    path('register', register),
    path('login', auth_views.LoginView.as_view(template_name='users/login.html'), name="login"),
    path('logout', auth_views.LogoutView.as_view(template_name='users/logout.html'), name="logout"),
    path('getData', getData, name='getData'),
    path('validate', validate, name="validate"),
    path('orders', orders, name="orders"),
    path('getOrders', getOrders, name="getOrders"),
    path('getOrders/staff', getOrdersStaff, name="getOrders"),
    path('putOrder', putOrder, name="putOrder"),
    path('removeItem/<tipo>/<ref>', removeItem, name="removeItem"),
    path('staffPage', staffPage, name="staffPage"),
    path('deleteOrder/<orderId>', deleteOrder, name="deleteOrder")
]

#url > view > process > response