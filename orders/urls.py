from django.urls import path, include
from orders.views import newpage, index
from users.views import register




urlpatterns = [
    path("", index, name="index"),
    path("newpage", newpage, name="newpage"),
    path('register', register)
]

#url > view > process > response